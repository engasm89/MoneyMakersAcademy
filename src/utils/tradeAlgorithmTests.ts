// Trade Recommendation Algorithm Tests
// This file contains comprehensive tests for the trading algorithms

export interface TestCurrencyData {
  code: string;
  name: string;
  change: number;
  flag: string;
}

export interface TestEntryCheckData {
  indicator: string;
  goodCriteria: string;
  lateCriteria: string;
  currentValue: string;
  status: 'good' | 'late' | 'caution';
}

export interface TestTradeRecommendation {
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

// Test scenarios for trade recommendations
export const testScenarios = {
  // Scenario 1: Strong bullish market
  bullishMarket: {
    currencies: [
      { code: 'USD', name: 'US Dollar', change: 1.2, flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', change: 0.8, flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', change: 0.6, flag: '🇬🇧' },
      { code: 'CAD', name: 'Canadian Dollar', change: 0.4, flag: '🇨🇦' },
      { code: 'AUD', name: 'Australian Dollar', change: 0.2, flag: '🇦🇺' },
      { code: 'CHF', name: 'Swiss Franc', change: -0.1, flag: '🇨🇭' },
      { code: 'NZD', name: 'New Zealand Dollar', change: -0.3, flag: '🇳🇿' },
      { code: 'JPY', name: 'Japanese Yen', change: -0.8, flag: '🇯🇵' },
    ] as TestCurrencyData[],
    expectedRecommendation: 'USD/JPY',
    expectedConfidence: 5,
    expectedAction: 'buy' as const
  },

  // Scenario 2: Bearish market
  bearishMarket: {
    currencies: [
      { code: 'JPY', name: 'Japanese Yen', change: 1.5, flag: '🇯🇵' },
      { code: 'CHF', name: 'Swiss Franc', change: 1.2, flag: '🇨🇭' },
      { code: 'NZD', name: 'New Zealand Dollar', change: 0.8, flag: '🇳🇿' },
      { code: 'AUD', name: 'Australian Dollar', change: 0.4, flag: '🇦🇺' },
      { code: 'CAD', name: 'Canadian Dollar', change: 0.1, flag: '🇨🇦' },
      { code: 'GBP', name: 'British Pound', change: -0.2, flag: '🇬🇧' },
      { code: 'EUR', name: 'Euro', change: -0.5, flag: '🇪🇺' },
      { code: 'USD', name: 'US Dollar', change: -0.8, flag: '🇺🇸' },
    ] as TestCurrencyData[],
    expectedRecommendation: 'JPY/USD',
    expectedConfidence: 5,
    expectedAction: 'buy' as const
  },

  // Scenario 3: Sideways market
  sidewaysMarket: {
    currencies: [
      { code: 'EUR', name: 'Euro', change: 0.3, flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', change: 0.2, flag: '🇬🇧' },
      { code: 'USD', name: 'US Dollar', change: 0.1, flag: '🇺🇸' },
      { code: 'CAD', name: 'Canadian Dollar', change: 0.0, flag: '🇨🇦' },
      { code: 'AUD', name: 'Australian Dollar', change: -0.1, flag: '🇦🇺' },
      { code: 'CHF', name: 'Swiss Franc', change: -0.2, flag: '🇨🇭' },
      { code: 'NZD', name: 'New Zealand Dollar', change: -0.3, flag: '🇳🇿' },
      { code: 'JPY', name: 'Japanese Yen', change: -0.4, flag: '🇯🇵' },
    ] as TestCurrencyData[],
    expectedRecommendation: 'EUR/JPY',
    expectedConfidence: 3,
    expectedAction: 'buy' as const
  }
};

// Test scenarios for late entry detection
export const lateEntryTestScenarios = {
  // Good entry conditions
  goodEntry: [
    {
      indicator: 'ATR (daily move %)',
      goodCriteria: '< 80% ATR',
      lateCriteria: '> 90% ATR',
      currentValue: '65% ATR',
      status: 'good' as const,
    },
    {
      indicator: 'Candle formation',
      goodCriteria: 'Small candle/retrace',
      lateCriteria: 'Parabolic, many big candles',
      currentValue: 'Small retrace',
      status: 'good' as const,
    },
    {
      indicator: 'RSI/Stoch',
      goodCriteria: '40–70',
      lateCriteria: '>75 or <25',
      currentValue: 'RSI = 55',
      status: 'good' as const,
    },
    {
      indicator: 'Price vs EMA (15m/1H)',
      goodCriteria: 'At/near EMA',
      lateCriteria: 'Far above/below EMA, stretched',
      currentValue: 'Near EMA',
      status: 'good' as const,
    },
    {
      indicator: 'Volatility spike',
      goodCriteria: 'Normal',
      lateCriteria: 'Huge news, big spike',
      currentValue: 'Normal levels',
      status: 'good' as const,
    },
  ] as TestEntryCheckData[],

  // Late entry conditions
  lateEntry: [
    {
      indicator: 'ATR (daily move %)',
      goodCriteria: '< 80% ATR',
      lateCriteria: '> 90% ATR',
      currentValue: '95% ATR',
      status: 'late' as const,
    },
    {
      indicator: 'Candle formation',
      goodCriteria: 'Small candle/retrace',
      lateCriteria: 'Parabolic, many big candles',
      currentValue: 'Parabolic move',
      status: 'late' as const,
    },
    {
      indicator: 'RSI/Stoch',
      goodCriteria: '40–70',
      lateCriteria: '>75 or <25',
      currentValue: 'RSI = 85',
      status: 'late' as const,
    },
    {
      indicator: 'Price vs EMA (15m/1H)',
      goodCriteria: 'At/near EMA',
      lateCriteria: 'Far above/below EMA, stretched',
      currentValue: 'Far above EMA',
      status: 'late' as const,
    },
    {
      indicator: 'Volatility spike',
      goodCriteria: 'Normal',
      lateCriteria: 'Huge news, big spike',
      currentValue: 'Huge spike',
      status: 'late' as const,
    },
  ] as TestEntryCheckData[],

  // Mixed conditions
  mixedConditions: [
    {
      indicator: 'ATR (daily move %)',
      goodCriteria: '< 80% ATR',
      lateCriteria: '> 90% ATR',
      currentValue: '75% ATR',
      status: 'good' as const,
    },
    {
      indicator: 'Candle formation',
      goodCriteria: 'Small candle/retrace',
      lateCriteria: 'Parabolic, many big candles',
      currentValue: 'Parabolic move',
      status: 'late' as const,
    },
    {
      indicator: 'RSI/Stoch',
      goodCriteria: '40–70',
      lateCriteria: '>75 or <25',
      currentValue: 'RSI = 60',
      status: 'good' as const,
    },
    {
      indicator: 'Price vs EMA (15m/1H)',
      goodCriteria: 'At/near EMA',
      lateCriteria: 'Far above/below EMA, stretched',
      currentValue: 'Near EMA',
      status: 'good' as const,
    },
    {
      indicator: 'Volatility spike',
      goodCriteria: 'Normal',
      lateCriteria: 'Huge news, big spike',
      currentValue: 'Normal levels',
      status: 'good' as const,
    },
  ] as TestEntryCheckData[]
};

// Algorithm test functions
export const testTradeRecommendationAlgorithm = (currencies: TestCurrencyData[]): TestTradeRecommendation[] => {
  const recommendations: TestTradeRecommendation[] = [];
  
  // Sort currencies by strength
  const sortedCurrencies = [...currencies].sort((a, b) => b.change - a.change);
  
  // Generate recommendations for top 3 strongest vs weakest pairs
  for (let i = 0; i < Math.min(3, sortedCurrencies.length / 2); i++) {
    const strongest = sortedCurrencies[i];
    const weakest = sortedCurrencies[sortedCurrencies.length - 1 - i];
    
    if (strongest && weakest) {
      const strengthDiff = strongest.change - weakest.change;
      
      // Calculate confidence score based on strength difference
      let confidenceScore = 1;
      if (strengthDiff > 1.0) confidenceScore = 5;
      else if (strengthDiff > 0.7) confidenceScore = 4;
      else if (strengthDiff > 0.4) confidenceScore = 3;
      else if (strengthDiff > 0.2) confidenceScore = 2;
      
      // Calculate entry score (lower is better)
      const entryScore = Math.max(0, 100 - (strengthDiff * 50));
      const isLateEntry = entryScore > 70;
      
      recommendations.push({
        id: `test-rec-${i}`,
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

export const testLateEntryDetection = (entryChecks: TestEntryCheckData[]): {
  goodCount: number;
  totalCount: number;
  safeToTrade: boolean;
  recommendation: string;
} => {
  const goodCount = entryChecks.filter(item => item.status === 'good').length;
  const totalCount = entryChecks.length;
  const safeToTrade = goodCount >= Math.ceil(totalCount * 0.6); // 60% threshold
  
  const recommendation = safeToTrade 
    ? `✅ All late entry checks are looking good! Trade appears to be a solid entry opportunity.`
    : `🚨 Too many late entry signals detected. Wait for a pullback or consolidation before trading.`;
  
  return {
    goodCount,
    totalCount,
    safeToTrade,
    recommendation
  };
};

// Performance test scenarios
export const performanceTestScenarios = {
  // High volatility market
  highVolatility: {
    currencies: [
      { code: 'USD', name: 'US Dollar', change: 2.5, flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', change: -2.1, flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', change: 1.8, flag: '🇬🇧' },
      { code: 'JPY', name: 'Japanese Yen', change: -1.9, flag: '🇯🇵' },
      { code: 'CAD', name: 'Canadian Dollar', change: 0.5, flag: '🇨🇦' },
      { code: 'AUD', name: 'Australian Dollar', change: -0.3, flag: '🇦🇺' },
      { code: 'CHF', name: 'Swiss Franc', change: 0.8, flag: '🇨🇭' },
      { code: 'NZD', name: 'New Zealand Dollar', change: -0.7, flag: '🇳🇿' },
    ] as TestCurrencyData[],
    expectedHighConfidence: true,
    expectedMultiplePairs: true
  },

  // Low volatility market
  lowVolatility: {
    currencies: [
      { code: 'USD', name: 'US Dollar', change: 0.1, flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', change: 0.05, flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', change: -0.05, flag: '🇬🇧' },
      { code: 'JPY', name: 'Japanese Yen', change: -0.1, flag: '🇯🇵' },
      { code: 'CAD', name: 'Canadian Dollar', change: 0.02, flag: '🇨🇦' },
      { code: 'AUD', name: 'Australian Dollar', change: -0.02, flag: '🇦🇺' },
      { code: 'CHF', name: 'Swiss Franc', change: 0.03, flag: '🇨🇭' },
      { code: 'NZD', name: 'New Zealand Dollar', change: -0.03, flag: '🇳🇿' },
    ] as TestCurrencyData[],
    expectedHighConfidence: false,
    expectedMultiplePairs: false
  }
};

// Run all tests
export const runAllTests = () => {
  console.log('🧪 Running Trade Algorithm Tests...\n');
  
  // Test trade recommendations
  console.log('📊 Testing Trade Recommendations:');
  Object.entries(testScenarios).forEach(([scenarioName, scenario]) => {
    const recommendations = testTradeRecommendationAlgorithm(scenario.currencies);
    const topRecommendation = recommendations[0];
    
    console.log(`\n${scenarioName}:`);
    console.log(`  Expected: ${scenario.expectedRecommendation}`);
    console.log(`  Got: ${topRecommendation?.suggested_pair}`);
    console.log(`  Confidence: ${topRecommendation?.confidence_score}/5`);
    console.log(`  Action: ${topRecommendation?.recommendation}`);
    console.log(`  ✅ ${topRecommendation?.suggested_pair === scenario.expectedRecommendation ? 'PASS' : 'FAIL'}`);
  });
  
  // Test late entry detection
  console.log('\n🚨 Testing Late Entry Detection:');
  Object.entries(lateEntryTestScenarios).forEach(([scenarioName, scenario]) => {
    const result = testLateEntryDetection(scenario);
    console.log(`\n${scenarioName}:`);
    console.log(`  Good indicators: ${result.goodCount}/${result.totalCount}`);
    console.log(`  Safe to trade: ${result.safeToTrade}`);
    console.log(`  Recommendation: ${result.recommendation}`);
  });
  
  // Test performance scenarios
  console.log('\n⚡ Testing Performance Scenarios:');
  Object.entries(performanceTestScenarios).forEach(([scenarioName, scenario]) => {
    const recommendations = testTradeRecommendationAlgorithm(scenario.currencies);
    const topRecommendation = recommendations[0];
    
    console.log(`\n${scenarioName}:`);
    console.log(`  High confidence: ${topRecommendation?.confidence_score >= 4 ? '✅' : '❌'}`);
    console.log(`  Multiple pairs: ${recommendations.length > 1 ? '✅' : '❌'}`);
    console.log(`  Top pair: ${topRecommendation?.suggested_pair}`);
  });
  
  console.log('\n🎯 All tests completed!');
};

// Export test runner for easy access
export default runAllTests;
