
// Mock data for demonstration - in production this would come from live APIs

export const mockCurrencyData = [
  { code: 'USD', name: 'US Dollar', change: 0.52, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', change: 0.23, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', change: 0.15, flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', change: 0.08, flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', change: -0.12, flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', change: -0.28, flag: '🇨🇭' },
  { code: 'NZD', name: 'New Zealand Dollar', change: -0.45, flag: '🇳🇿' },
  { code: 'JPY', name: 'Japanese Yen', change: -0.63, flag: '🇯🇵' },
];

export const mockEntryCheckData = [
  {
    indicator: 'ATR (daily move %)',
    goodCriteria: '< 80% ATR',
    lateCriteria: '> 90% ATR',
    currentValue: '68% ATR',
    status: 'good' as const,
  },
  {
    indicator: 'Candle formation',
    goodCriteria: 'Small candle/retrace',
    lateCriteria: 'Parabolic, many big candles',
    currentValue: 'Retrace seen',
    status: 'good' as const,
  },
  {
    indicator: 'RSI/Stoch',
    goodCriteria: '40–70',
    lateCriteria: '>75 or <25',
    currentValue: 'RSI = 59',
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
];

// Function to generate random but realistic forex data
export const generateRandomForexData = () => {
  return mockCurrencyData.map(currency => ({
    ...currency,
    change: (Math.random() - 0.5) * 2, // Random change between -1% and +1%
  })).sort((a, b) => b.change - a.change);
};

// Function to generate random entry check data
export const generateRandomEntryCheck = () => {
  const statuses: ('good' | 'late' | 'caution')[] = ['good', 'late', 'caution'];
  
  return mockEntryCheckData.map(item => ({
    ...item,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};
