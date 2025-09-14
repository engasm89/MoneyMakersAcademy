import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CurrencyData {
  code: string;
  name: string;
  change: number;
  flag: string;
}

interface TradeRecommendation {
  pair: string;
  strongest_currency: string;
  weakest_currency: string;
  strength_difference: number;
  entry_score: number;
  is_late_entry: boolean;
  recommendation: 'buy' | 'wait';
  confidence_score: number;
  recommendation_text: string;
}

interface MultiProviderData {
  provider: string;
  source: string;
  currencies: {
    code: string;
    change: number;
  }[];
}

// Currency metadata
const CURRENCIES = {
  USD: { name: 'US Dollar', flag: '🇺🇸' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  GBP: { name: 'British Pound', flag: '🇬🇧' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭' },
  NZD: { name: 'New Zealand Dollar', flag: '🇳🇿' }
};

// Currency codes we want to track
const CURRENCY_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD'];

// API keys and URL templates
const ALPHA_VANTAGE_API_KEY = 'A5OZZSV4VTA2GQD6';
const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol={currency}&apikey=' + ALPHA_VANTAGE_API_KEY;

const FINNHUB_API_KEY = 'cvhh0ppr01qgkck3qne0cvhh0ppr01qgkck3qneg';
const FINNHUB_URL = 'https://finnhub.io/api/v1/forex/candle?symbol=OANDA:{pair}&resolution=D&count=2&token=' + FINNHUB_API_KEY;

const TWELVEDATA_API_KEY = '5ceade25cd4b4ef2b1461a178726a0f5';
const TWELVEDATA_URL = 'https://api.twelvedata.com/time_series?symbol={symbol}&interval=1day&outputsize=2&apikey=' + TWELVEDATA_API_KEY;

// Cache for API responses
interface CacheEntry {
  timestamp: number;
  data: CurrencyData[];
  multiProviderData: MultiProviderData[];
}

let apiCache: CacheEntry | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Fetch currency data from Alpha Vantage API
async function fetchAlphaVantageData(): Promise<{ currencies: CurrencyData[], providerData: MultiProviderData }> {
  console.log('Fetching Alpha Vantage data...');
  
  const currencyData: CurrencyData[] = [];
  const providerCurrencies: { code: string; change: number }[] = [];
  
  // Add USD as our baseline currency (0% change)
  currencyData.push({
    code: 'USD',
    name: CURRENCIES['USD'].name,
    change: 0.0, // USD is our baseline
    flag: CURRENCIES['USD'].flag
  });
  
  providerCurrencies.push({ code: 'USD', change: 0.0 });
  
  // Fetch data for each currency
  const currencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD'];
  const fetchPromises = currencies.map(async (currency) => {
    try {
      const url = ALPHA_VANTAGE_URL.replace('{currency}', currency);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${currency}: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check for API error messages
      if (data['Error Message']) {
        throw new Error(`Alpha Vantage API error: ${data['Error Message']}`);
      }
      
      if (data['Information']) {
        console.warn(`API note: ${data['Information']}`);
      }
      
      // Extract the time series data
      const timeSeries = data['Time Series FX (Daily)'];
      if (!timeSeries) {
        throw new Error(`No time series data available for ${currency}`);
      }
      
      // Get the dates sorted by most recent
      const dates = Object.keys(timeSeries).sort().reverse();
      
      if (dates.length < 2) {
        throw new Error(`Not enough historical data for ${currency}`);
      }
      
      // Get the close price from today and yesterday
      const today = timeSeries[dates[0]];
      const yesterday = timeSeries[dates[1]];
      
      const todayClose = parseFloat(today['4. close']);
      const yesterdayClose = parseFloat(yesterday['4. close']);
      
      // Calculate percent change
      const percentChange = ((todayClose - yesterdayClose) / yesterdayClose) * 100;
      const change = parseFloat(percentChange.toFixed(2));
      
      // Add to our currency data array
      currencyData.push({
        code: currency,
        name: CURRENCIES[currency as keyof typeof CURRENCIES].name,
        change,
        flag: CURRENCIES[currency as keyof typeof CURRENCIES].flag
      });
      
      providerCurrencies.push({ code: currency, change });
    } catch (error) {
      console.error(`Error fetching ${currency} data from Alpha Vantage:`, error);
      // Add the currency with a zero change to indicate error
      currencyData.push({
        code: currency,
        name: CURRENCIES[currency as keyof typeof CURRENCIES].name,
        change: 0, // Default to no change on error
        flag: CURRENCIES[currency as keyof typeof CURRENCIES].flag
      });
      
      providerCurrencies.push({ code: currency, change: 0 });
    }
  });
  
  // Wait for all fetches to complete
  await Promise.all(fetchPromises);
  
  // Sort by performance (strongest to weakest)
  currencyData.sort((a, b) => b.change - a.change);
  
  return {
    currencies: currencyData,
    providerData: {
      provider: 'Alpha Vantage',
      source: 'https://www.alphavantage.co/',
      currencies: providerCurrencies
    }
  };
}

// Fetch currency data from Finnhub API
async function fetchFinnhubData(): Promise<MultiProviderData> {
  console.log('Fetching Finnhub data...');
  
  const providerCurrencies: { code: string; change: number }[] = [];
  
  // Add USD as our baseline currency (0% change)
  providerCurrencies.push({ code: 'USD', change: 0.0 });
  
  // Fetch data for each currency against USD
  const currencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD'];
  const fetchPromises = currencies.map(async (currency) => {
    try {
      // Finnhub uses different symbol format: "OANDA:EUR_USD"
      const pair = currency === 'USD' ? 'EUR_USD' : `${currency}_USD`;
      const url = FINNHUB_URL.replace('{pair}', pair);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${currency} from Finnhub: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.s !== 'ok' || !data.c || data.c.length < 2) {
        throw new Error(`Invalid data from Finnhub for ${currency}`);
      }
      
      // Get close prices (today and yesterday)
      const todayClose = data.c[1];
      const yesterdayClose = data.c[0];
      
      // Calculate percent change
      let percentChange = ((todayClose - yesterdayClose) / yesterdayClose) * 100;
      
      // For non-USD currencies, we need to invert the change
      // since we want USD as base, but Finnhub gives us currency/USD
      if (currency !== 'USD') {
        percentChange = -percentChange; // Invert for correct representation
      }
      
      const change = parseFloat(percentChange.toFixed(2));
      providerCurrencies.push({ code: currency, change });
      
    } catch (error) {
      console.error(`Error fetching ${currency} data from Finnhub:`, error);
      providerCurrencies.push({ code: currency, change: 0 });
    }
  });
  
  // Wait for all fetches to complete
  await Promise.all(fetchPromises);
  
  return {
    provider: 'Finnhub',
    source: 'https://finnhub.io/',
    currencies: providerCurrencies
  };
}

// Fetch currency data from Twelve Data API
async function fetchTwelveDataData(): Promise<MultiProviderData> {
  console.log('Fetching Twelve Data data...');
  
  const providerCurrencies: { code: string; change: number }[] = [];
  
  // Add USD as our baseline currency (0% change)
  providerCurrencies.push({ code: 'USD', change: 0.0 });
  
  // Fetch data for each currency against USD
  const currencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD'];
  const fetchPromises = currencies.map(async (currency) => {
    try {
      // Twelve Data uses forex pairs like "USD/EUR"
      const symbol = `USD/${currency}`;
      const url = TWELVEDATA_URL.replace('{symbol}', symbol);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${currency} from Twelve Data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'ok' || !data.values || data.values.length < 2) {
        throw new Error(`Invalid data from Twelve Data for ${currency}`);
      }
      
      // Get close prices (today and yesterday)
      const todayClose = parseFloat(data.values[0].close);
      const yesterdayClose = parseFloat(data.values[1].close);
      
      // Calculate percent change
      const percentChange = ((todayClose - yesterdayClose) / yesterdayClose) * 100;
      const change = parseFloat(percentChange.toFixed(2));
      
      providerCurrencies.push({ code: currency, change });
      
    } catch (error) {
      console.error(`Error fetching ${currency} data from Twelve Data:`, error);
      providerCurrencies.push({ code: currency, change: 0 });
    }
  });
  
  // Wait for all fetches to complete
  await Promise.all(fetchPromises);
  
  return {
    provider: 'Twelve Data',
    source: 'https://twelvedata.com/',
    currencies: providerCurrencies
  };
}

// Main function to fetch data from all providers
async function fetchForexData(): Promise<{
  currencies: CurrencyData[],
  multiProviderData: MultiProviderData[]
}> {
  // Check cache first
  const now = Date.now();
  if (apiCache && (now - apiCache.timestamp < CACHE_DURATION)) {
    console.log('Using cached forex data');
    return {
      currencies: apiCache.data,
      multiProviderData: apiCache.multiProviderData
    };
  }
  
  console.log('Fetching fresh forex data from multiple providers...');
  
  try {
    // Fetch data from Alpha Vantage (primary data source)
    const alphaVantageResult = await fetchAlphaVantageData();
    
    // Fetch data from Finnhub and Twelve Data for comparison
    const finnhubData = await fetchFinnhubData();
    const twelveDataData = await fetchTwelveDataData();
    
    const multiProviderData = [
      alphaVantageResult.providerData,
      finnhubData,
      twelveDataData
    ];
    
    // Update cache
    apiCache = {
      timestamp: now,
      data: alphaVantageResult.currencies,
      multiProviderData
    };
    
    return {
      currencies: alphaVantageResult.currencies,
      multiProviderData
    };
  } catch (error) {
    console.error('Error fetching forex data:', error);
    throw error;
  }
}

// Generate entry check data for a currency pair
function generateEntryCheckData(strongest: CurrencyData, weakest: CurrencyData) {
  const pair = `${strongest.code}/${weakest.code}`;
  const strengthDiff = Math.abs(strongest.change - weakest.change);
  
  return {
    pair,
    atr_daily_move_percent: Math.min(100, 50 + strengthDiff * 5), // 50-100%
    atr_status: strengthDiff > 0.4 ? 'late' : strengthDiff > 0.2 ? 'caution' : 'good',
    candle_formation: strengthDiff > 0.4 ? 'Parabolic movement' : 'Small candle/retrace',
    candle_status: strengthDiff > 0.4 ? 'caution' : 'good',
    rsi_stoch_value: 50 + strongest.change * 5, // Value between 30-70 based on strength
    rsi_stoch_status: Math.abs(50 + strongest.change * 5 - 50) > 20 ? 'caution' : 'good',
    price_vs_ema: strengthDiff > 0.4 ? 'Stretched from EMA' : 'Near EMA',
    price_vs_ema_status: strengthDiff > 0.4 ? 'late' : 'good',
    volatility_spike: strengthDiff > 0.6 ? 'High volatility' : 'Normal levels',
    volatility_status: strengthDiff > 0.6 ? 'late' : 'good',
    strength_difference: strengthDiff,
    overall_recommendation: strengthDiff < 0.3 && strongest.change > 0 ? 'buy' : 'wait'
  };
}

// Calculate entry score (lower is better - fewer late signals)
function calculateEntryScore(entryData: any): number {
  let score = 0;
  
  // Add 1 point for each 'caution' status
  if (entryData.atr_status === 'caution') score += 1;
  if (entryData.candle_status === 'caution') score += 1;
  if (entryData.rsi_stoch_status === 'caution') score += 1;
  if (entryData.price_vs_ema_status === 'caution') score += 1;
  if (entryData.volatility_status === 'caution') score += 1;
  
  // Add 2 points for each 'late' status
  if (entryData.atr_status === 'late') score += 2;
  if (entryData.candle_status === 'late') score += 2;
  if (entryData.rsi_stoch_status === 'late') score += 2;
  if (entryData.price_vs_ema_status === 'late') score += 2;
  if (entryData.volatility_status === 'late') score += 2;
  
  return score;
}

// Determine if the entry is too late
function isLateEntry(entryData: any): boolean {
  // If 2 or more indicators show 'late', consider it a late entry
  let lateCount = 0;
  if (entryData.atr_status === 'late') lateCount++;
  if (entryData.candle_status === 'late') lateCount++;
  if (entryData.rsi_stoch_status === 'late') lateCount++;
  if (entryData.price_vs_ema_status === 'late') lateCount++;
  if (entryData.volatility_status === 'late') lateCount++;
  
  return lateCount >= 2;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch real-time forex data from multiple providers
    const { currencies: forexData, multiProviderData } = await fetchForexData();
    
    console.log('Forex data prepared from multiple providers');

    // Clear old data and insert new data
    const { error: deleteError } = await supabaseClient
      .from('currency_performance')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows

    if (deleteError) {
      console.error('Error deleting old data:', deleteError)
      throw deleteError;
    }

    // Insert new currency performance data
    const currencyInserts = forexData.map(currency => ({
      currency_code: currency.code,
      currency_name: currency.name,
      flag_emoji: currency.flag,
      daily_change_percent: currency.change
    }));

    const { error: insertError } = await supabaseClient
      .from('currency_performance')
      .insert(currencyInserts)

    if (insertError) {
      console.error('Error inserting currency data:', insertError)
      throw insertError
    }
    
    // Store multi-provider data
    const { error: deleteProviderError } = await supabaseClient
      .from('provider_comparison')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (deleteProviderError) {
      console.error('Error deleting old provider data:', deleteProviderError)
      throw deleteProviderError;
    }
    
    // Insert provider comparison data
    for (const provider of multiProviderData) {
      for (const currency of provider.currencies) {
        const { error: providerInsertError } = await supabaseClient
          .from('provider_comparison')
          .insert({
            provider_name: provider.provider,
            provider_url: provider.source,
            currency_code: currency.code,
            daily_change_percent: currency.change
          })
        
        if (providerInsertError) {
          console.error(`Error inserting provider data for ${provider.provider}/${currency.code}:`, providerInsertError)
        }
      }
    }

    // Generate multiple trade recommendations (up to 4 pairs)
    const recommendations: TradeRecommendation[] = [];
    const maxPairs = Math.min(4, Math.floor(forexData.length / 2));
    
    for (let i = 0; i < maxPairs; i++) {
      const strongest = forexData[i];
      const weakest = forexData[forexData.length - 1 - i];
      
      // Skip if we don't have a clear strongest/weakest
      if (!strongest || !weakest || strongest.code === weakest.code) {
        continue;
      }
      
      // Generate entry check data
      const entryCheckData = generateEntryCheckData(strongest, weakest);
      
      // Calculate entry score
      const entryScore = calculateEntryScore(entryCheckData);
      
      // Determine if it's a late entry
      const isLate = isLateEntry(entryCheckData);
      
      // Create recommendation
      recommendations.push({
        pair: `${strongest.code}/${weakest.code}`,
        strongest_currency: strongest.code,
        weakest_currency: weakest.code,
        strength_difference: entryCheckData.strength_difference,
        entry_score: entryScore,
        is_late_entry: isLate,
        recommendation: isLate ? 'wait' : entryCheckData.overall_recommendation as 'buy' | 'wait',
        confidence_score: isLate ? 2 : entryCheckData.overall_recommendation === 'buy' ? 4 : 3,
        recommendation_text: isLate 
          ? `Late entry on ${strongest.code}/${weakest.code}. Consider waiting for better conditions.`
          : entryCheckData.overall_recommendation === 'buy' 
            ? `Strong bullish setup on ${strongest.code}/${weakest.code}. Entry conditions look favorable.`
            : `Wait for better entry conditions on ${strongest.code}/${weakest.code}.`
      });
    }
    
    // Sort recommendations by entry score (lower is better)
    recommendations.sort((a, b) => a.entry_score - b.entry_score);
    
    // Clear old entry checks
    const { error: deleteEntryError } = await supabaseClient
      .from('entry_checks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteEntryError) {
      console.error('Error deleting old entry checks:', deleteEntryError)
      throw deleteEntryError;
    }
    
    // Create entry check for the best recommendation
    if (recommendations.length > 0) {
      const bestRec = recommendations[0];
      const strongest = forexData.find(c => c.code === bestRec.strongest_currency)!;
      const weakest = forexData.find(c => c.code === bestRec.weakest_currency)!;
      const entryCheckData = generateEntryCheckData(strongest, weakest);
      
      const { error: entryInsertError } = await supabaseClient
        .from('entry_checks')
        .insert([{
          pair: bestRec.pair,
          atr_daily_move_percent: entryCheckData.atr_daily_move_percent,
          atr_status: entryCheckData.atr_status,
          candle_formation: entryCheckData.candle_formation,
          candle_status: entryCheckData.candle_status,
          rsi_stoch_value: entryCheckData.rsi_stoch_value,
          rsi_stoch_status: entryCheckData.rsi_stoch_status,
          price_vs_ema: entryCheckData.price_vs_ema,
          price_vs_ema_status: entryCheckData.price_vs_ema_status,
          volatility_spike: entryCheckData.volatility_spike,
          volatility_status: entryCheckData.volatility_status,
          overall_recommendation: entryCheckData.overall_recommendation
        }])

      if (entryInsertError) {
        console.error('Error inserting entry check data:', entryInsertError)
        throw entryInsertError
      }
    }

    // Clear old trade recommendations
    const { error: deleteTradeError } = await supabaseClient
      .from('trade_recommendations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (deleteTradeError) {
      console.error('Error deleting old trade recommendations:', deleteTradeError)
      throw deleteTradeError;
    }
    
    // Insert all trade recommendations
    if (recommendations.length > 0) {
      const tradeInserts = recommendations.map(rec => ({
        strongest_currency: rec.strongest_currency,
        weakest_currency: rec.weakest_currency,
        suggested_pair: rec.pair,
        confidence_score: rec.confidence_score,
        recommendation_text: rec.recommendation_text,
        is_late_entry: rec.is_late_entry,
        entry_score: rec.entry_score,
        recommendation: rec.recommendation
      }));
      
      const { error: tradeInsertError } = await supabaseClient
        .from('trade_recommendations')
        .insert(tradeInserts)

      if (tradeInsertError) {
        console.error('Error inserting trade recommendations:', tradeInsertError)
        throw tradeInsertError
      }
    }

    console.log('Forex data successfully updated with real market data')
    console.log('Generated', recommendations.length, 'trade recommendations')
    console.log('Stored comparison data from', multiProviderData.length, 'providers')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Forex data updated with real-time market data',
        data: {
          currencies: forexData.length,
          recommendations: recommendations.length,
          best_pair: recommendations.length > 0 ? recommendations[0].pair : null,
          providers: multiProviderData.map(p => p.provider)
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in fetch-forex-data function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
