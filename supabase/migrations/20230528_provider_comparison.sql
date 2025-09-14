-- Create a table to store currency data from different providers
CREATE TABLE IF NOT EXISTS provider_comparison (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name TEXT NOT NULL,
  provider_url TEXT,
  currency_code TEXT NOT NULL,
  daily_change_percent DECIMAL(10, 4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS provider_comparison_provider_idx ON provider_comparison (provider_name);
CREATE INDEX IF NOT EXISTS provider_comparison_currency_idx ON provider_comparison (currency_code);

-- Add comments for documentation
COMMENT ON TABLE provider_comparison IS 'Stores currency strength data from different providers for comparison';
COMMENT ON COLUMN provider_comparison.provider_name IS 'Name of the data provider (e.g., Alpha Vantage, Finnhub)';
COMMENT ON COLUMN provider_comparison.provider_url IS 'URL of the data provider website';
COMMENT ON COLUMN provider_comparison.currency_code IS 'ISO currency code (e.g., USD, EUR)';
COMMENT ON COLUMN provider_comparison.daily_change_percent IS 'Daily percent change of the currency'; 