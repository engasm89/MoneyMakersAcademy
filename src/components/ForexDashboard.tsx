import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import CurrencyStrengthTable from "./CurrencyStrengthTable";
import LateEntryCheck from "./LateEntryCheck";
import TradeRecommendation from "./TradeRecommendation";
import CurrencyStrengthChart from "./CurrencyStrengthChart";
import AlgorithmTestPanel from "./AlgorithmTestPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { mockCurrencyData, mockEntryCheckData, generateRandomForexData, generateRandomEntryCheck } from "@/utils/mockData";

interface CurrencyData {
  code: string;
  name: string;
  change: number;
  flag: string;
}

interface EntryCheckData {
  indicator: string;
  goodCriteria: string;
  lateCriteria: string;
  currentValue: string;
  status: 'good' | 'late' | 'caution';
}

interface TradeRecommendationData {
  id: string;
  suggested_pair: string;
  strongest_currency: string;
  weakest_currency: string;
  confidence_score: number;
  recommendation_text: string;
  is_late_entry: boolean;
  entry_score: number;
  recommendation: 'buy' | 'wait';
  created_at: string;
}

interface ProviderComparisonData {
  provider_name: string;
  provider_url: string;
  currency_code: string;
  daily_change_percent: number;
}

const ForexDashboard = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);
  const [entryCheckData, setEntryCheckData] = useState<EntryCheckData[]>([]);
  const [tradeRecommendations, setTradeRecommendations] = useState<TradeRecommendationData[]>([]);
  const [providerData, setProviderData] = useState<{[key: string]: {code: string, change: number}[]}>({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock trade recommendations
  const generateMockTradeRecommendations = (currencyData: CurrencyData[]): TradeRecommendationData[] => {
    const recommendations: TradeRecommendationData[] = [];
    
    // Generate recommendations for top 3 strongest vs weakest pairs
    for (let i = 0; i < Math.min(3, currencyData.length / 2); i++) {
      const strongest = currencyData[i];
      const weakest = currencyData[currencyData.length - 1 - i];
      
      if (strongest && weakest) {
        const strengthDiff = strongest.change - weakest.change;
        const confidenceScore = Math.min(5, Math.max(1, Math.floor(strengthDiff * 10) + 3));
        const entryScore = Math.random() * 100;
        const isLateEntry = entryScore > 70;
        
        recommendations.push({
          id: `rec-${i}`,
          suggested_pair: `${strongest.code}/${weakest.code}`,
          strongest_currency: strongest.code,
          weakest_currency: weakest.code,
          confidence_score: confidenceScore,
          recommendation_text: isLateEntry 
            ? `Wait for pullback - ${strongest.code}/${weakest.code} showing late entry signals`
            : `Good entry opportunity - ${strongest.code}/${weakest.code} has strong momentum`,
          is_late_entry: isLateEntry,
          entry_score: entryScore,
          recommendation: isLateEntry ? 'wait' : 'buy',
          created_at: new Date().toISOString()
        });
      }
    }
    
    return recommendations.sort((a, b) => a.entry_score - b.entry_score);
  };

  // Generate mock provider data
  const generateMockProviderData = () => {
    const providers = ['Alpha Vantage', 'Finnhub', 'Twelve Data'];
    const providerData: {[key: string]: {code: string, change: number}[]} = {};
    
    providers.forEach(provider => {
      providerData[provider] = generateRandomForexData().map(currency => ({
        code: currency.code,
        change: currency.change + (Math.random() - 0.5) * 0.2 // Add small variation
      }));
    });
    
    return providerData;
  };

  // Fetch data from database
  const fetchDataFromDatabase = async () => {
    try {
      // Try to fetch from Supabase first
      const { data: currencyPerformance, error: currencyError } = await supabase
        .from('currency_performance')
        .select('*')
        .order('daily_change_percent', { ascending: false });

      if (currencyError) {
        console.log('Supabase unavailable, using mock data:', currencyError);
        // Use mock data if Supabase is unavailable
        const mockData = generateRandomForexData();
        setCurrencyData(mockData);
        setEntryCheckData(generateRandomEntryCheck());
        
        // Generate mock trade recommendations
        const mockRecommendations = generateMockTradeRecommendations(mockData);
        setTradeRecommendations(mockRecommendations);
        
        // Generate mock provider data
        const mockProviderData = generateMockProviderData();
        setProviderData(mockProviderData);
        
        setLastUpdated(new Date());
        return;
      }

      // Transform database data to component format
      const transformedCurrency: CurrencyData[] = currencyPerformance?.map(item => ({
        code: item.currency_code,
        name: item.currency_name,
        change: parseFloat(item.daily_change_percent?.toString() || '0'),
        flag: item.flag_emoji || '🏳️'
      })) || [];

      setCurrencyData(transformedCurrency);

      // Fetch entry check data
      const { data: entryChecks, error: entryError } = await supabase
        .from('entry_checks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (entryError) throw entryError;

      if (entryChecks && entryChecks.length > 0) {
        const latestEntry = entryChecks[0];
        const transformedEntryData: EntryCheckData[] = [
          {
            indicator: 'ATR (daily move %)',
            goodCriteria: '< 80% ATR',
            lateCriteria: '> 90% ATR',
            currentValue: `${latestEntry.atr_daily_move_percent?.toFixed(0)}% ATR`,
            status: latestEntry.atr_status as 'good' | 'late' | 'caution'
          },
          {
            indicator: 'Candle formation',
            goodCriteria: 'Small candle/retrace',
            lateCriteria: 'Parabolic, many big candles',
            currentValue: latestEntry.candle_formation || 'Unknown',
            status: latestEntry.candle_status as 'good' | 'late' | 'caution'
          },
          {
            indicator: 'RSI/Stoch',
            goodCriteria: '40–70',
            lateCriteria: '>75 or <25',
            currentValue: `RSI = ${latestEntry.rsi_stoch_value?.toFixed(0)}`,
            status: latestEntry.rsi_stoch_status as 'good' | 'late' | 'caution'
          },
          {
            indicator: 'Price vs EMA (15m/1H)',
            goodCriteria: 'At/near EMA',
            lateCriteria: 'Far above/below EMA, stretched',
            currentValue: latestEntry.price_vs_ema || 'Unknown',
            status: latestEntry.price_vs_ema_status as 'good' | 'late' | 'caution'
          },
          {
            indicator: 'Volatility spike',
            goodCriteria: 'Normal',
            lateCriteria: 'Huge news, big spike',
            currentValue: latestEntry.volatility_spike || 'Unknown',
            status: latestEntry.volatility_status as 'good' | 'late' | 'caution'
          }
        ];
        setEntryCheckData(transformedEntryData);
      }
      
      // Fetch trade recommendations
      const { data: recommendations, error: recError } = await supabase
        .from('trade_recommendations')
        .select('*')
        .order('entry_score', { ascending: true });
        
      if (recError) throw recError;
      
      if (recommendations) {
        setTradeRecommendations(recommendations as TradeRecommendationData[]);
      }
      
      // Fetch provider comparison data
      const { data: providerComparison, error: providerError } = await supabase
        .from('provider_comparison')
        .select('*');
        
      if (providerError) throw providerError;
      
      if (providerComparison) {
        // Transform provider data for charts
        const providers: {[key: string]: {code: string, change: number}[]} = {};
        
        providerComparison.forEach((item: ProviderComparisonData) => {
          if (!providers[item.provider_name]) {
            providers[item.provider_name] = [];
          }
          
          providers[item.provider_name].push({
            code: item.currency_code,
            change: parseFloat(item.daily_change_percent?.toString() || '0')
          });
        });
        
        setProviderData(providers);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data from database:', error);
      toast.error('Failed to fetch latest data');
    }
  };

  // Fetch fresh data from external sources via Edge Function
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Try to invoke the Edge Function
      const { data, error } = await supabase.functions.invoke('fetch-forex-data');
      
      if (error) {
        console.log('Edge Function unavailable, using mock data:', error);
        // Use mock data if Edge Function is unavailable
        const mockData = generateRandomForexData();
        setCurrencyData(mockData);
        setEntryCheckData(generateRandomEntryCheck());
        
        const mockRecommendations = generateMockTradeRecommendations(mockData);
        setTradeRecommendations(mockRecommendations);
        
        const mockProviderData = generateMockProviderData();
        setProviderData(mockProviderData);
        
        setLastUpdated(new Date());
        toast.success('Mock forex data refreshed successfully!');
        return;
      }
      
      console.log('Forex data updated:', data);
      toast.success('Live forex data updated successfully!');
      
      // Fetch the updated data from database
      await fetchDataFromDatabase();
    } catch (error) {
      console.error('Error refreshing forex data:', error);
      // Fallback to mock data
      const mockData = generateRandomForexData();
      setCurrencyData(mockData);
      setEntryCheckData(generateRandomEntryCheck());
      
      const mockRecommendations = generateMockTradeRecommendations(mockData);
      setTradeRecommendations(mockRecommendations);
      
      const mockProviderData = generateMockProviderData();
      setProviderData(mockProviderData);
      
      setLastUpdated(new Date());
      toast.success('Mock forex data refreshed successfully!');
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const strongest = currencyData[0];
  const weakest = currencyData[currencyData.length - 1];
  const suggestedPair = strongest && weakest ? `${strongest.code}/${weakest.code}` : 'Loading...';

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="text-green-600" />
            Forex Analysis Dashboard
          </h1>
          <p className="text-slate-600 mt-1">
            Live currency strength analysis with real-time data
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">Last Updated</p>
            <p className="text-sm font-medium">
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Fetching Live Data...' : 'Refresh Live Data'}
          </Button>
        </div>
      </div>

      {/* Quick Overview Cards */}
      {strongest && weakest && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Strongest Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-800">{strongest.code}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  +{strongest.change.toFixed(2)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Weakest Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-800">{weakest.code}</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {weakest.change.toFixed(2)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Suggested Pair
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {tradeRecommendations.length > 0 ? tradeRecommendations[0].suggested_pair : suggestedPair}
              </div>
              <p className="text-sm text-blue-600 mt-1">
                {tradeRecommendations.length > 0 
                  ? `${tradeRecommendations[0].recommendation === 'buy' ? 'BUY' : 'WAIT'} - ${tradeRecommendations.length} pairs analyzed`
                  : `Buy ${strongest.code} vs ${weakest.code}`
                }
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Currency Strength Table */}
      {currencyData.length > 0 && <CurrencyStrengthTable data={currencyData} />}

      {/* Late Entry Check */}
      {entryCheckData.length > 0 && <LateEntryCheck data={entryCheckData} pair={suggestedPair} />}

      {/* Trade Recommendation */}
      {strongest && weakest && entryCheckData.length > 0 && (
        <TradeRecommendation 
          strongest={strongest} 
          weakest={weakest} 
          entryCheckData={entryCheckData}
          pair={suggestedPair}
          recommendations={tradeRecommendations}
        />
      )}
      
      {/* Provider Comparison Charts */}
      {Object.keys(providerData).length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">Currency Strength by Provider</h2>
          <p className="text-slate-600">Compare currency strength data from multiple providers to make more informed decisions.</p>
          
          <div className="grid grid-cols-1 gap-6 mt-4">
            {Object.entries(providerData).map(([provider, data]) => (
              <CurrencyStrengthChart 
                key={provider}
                data={data}
                title={`1 Day Relative Performance [USD]`} 
                provider={provider}
              />
            ))}
          </div>
        </div>
      )}

      {/* Algorithm Testing Panel */}
      <div className="mt-8">
        <AlgorithmTestPanel />
      </div>

      {/* Loading state */}
      {currencyData.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading forex data...</p>
            <Button onClick={handleRefresh} className="mt-4">
              Fetch Data Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForexDashboard;
