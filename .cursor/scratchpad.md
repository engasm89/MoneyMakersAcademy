# Forex Pulse Check - Deployment Guide

## Overview of Changes
We've updated the application to provide:

1. Multiple trade recommendations based on currency strength (strongest vs weakest, 2nd strongest vs 2nd weakest, etc.)
2. Evaluation of entry conditions for each pair
3. Identification of the best trading opportunities
4. Comparison of currency strength data from three providers (Alpha Vantage, Finnhub, and Twelve Data)
5. Visual charts showing currency strength from each provider for direct comparison

## New Features

### Multi-Provider Currency Charts
The application now fetches forex data from three different providers:
- Alpha Vantage (API key: A5OZZSV4VTA2GQD6)
- Finnhub (API key: cvhh0ppr01qgkck3qne0cvhh0ppr01qgkck3qneg)
- Twelve Data (API key: 5ceade25cd4b4ef2b1461a178726a0f5)

The data is displayed in three separate charts at the end of the dashboard, allowing you to compare currency strength across different data sources.

### Database Schema Changes
We've added a new table to store data from multiple providers:
- `provider_comparison`: Stores currency strength data from different providers

## How to Deploy the Updated Function

### Option 1: Using the Supabase Dashboard (Recommended)

1. Log in to your Supabase dashboard at https://app.supabase.com/
2. Select your project (Project ID: yruasjxuyjhzljizbsia)
3. Navigate to "SQL Editor" in the left sidebar
4. Create a new query and paste the contents of `supabase/migrations/20230528_provider_comparison.sql`
5. Run the query to create the necessary table
6. Navigate to "Edge Functions" in the left sidebar
7. Find the "fetch-forex-data" function
8. Click on it to view details, then click "Edit" or a similar button
9. Replace the entire code with the updated version from `supabase/functions/fetch-forex-data/index.ts`
10. Click "Deploy" or "Save"

### Option 2: Using the Supabase CLI

If you prefer using the CLI (requires installation):

1. Install the Supabase CLI:
   ```
   npm install -g supabase
   ```

2. Login to Supabase:
   ```
   supabase login
   ```

3. Navigate to your project directory:
   ```
   cd /Users/macbook/Documents/GitHub/forex-pulse-check-daily
   ```

4. Link your project:
   ```
   supabase link --project-ref yruasjxuyjhzljizbsia
   ```

5. Deploy the SQL migration:
   ```
   supabase db push
   ```

6. Deploy the updated function:
   ```
   supabase functions deploy fetch-forex-data
   ```

## Verifying the Deployment

After deployment:

1. Go to your application
2. Click the "Refresh Live Data" button
3. Verify that multiple trade recommendations appear in the interface
4. Check that the pairs are correctly ranked by entry quality
5. Ensure that the best recommendation is highlighted at the top
6. Scroll to the bottom to see the three currency strength charts from different providers

## Schema Changes

The updated Edge Function expects the following tables:

1. `trade_recommendations` with additional fields:
   - `is_late_entry` (boolean): Indicates if the entry is considered late
   - `entry_score` (integer): A score for entry quality (lower is better)
   - `recommendation` (text): Either 'buy' or 'wait'

2. `provider_comparison` (new table):
   - `provider_name` (text): Name of the data provider
   - `provider_url` (text): URL of the data provider
   - `currency_code` (text): Currency code
   - `daily_change_percent` (decimal): Percent change of the currency

## Troubleshooting

If you encounter any issues:

1. Check the function logs in the Supabase dashboard
2. Verify that the API keys for all three providers are correct
3. Ensure that the database tables have the expected structure
4. Check for any rate-limiting issues with the providers (free tiers have limits)
5. If charts don't appear, verify that the `provider_comparison` table was created successfully

## Rate Limits

Be aware of the rate limits for each provider:

- Alpha Vantage: 5 calls per minute, 500 calls per day (free tier)
- Finnhub: 60 calls per minute (free tier)
- Twelve Data: 800 API credits per day (free tier)

To avoid hitting rate limits, the application implements caching that stores data for 1 hour.

## Next Steps

With these changes, you'll now be able to:
1. See multiple trading opportunities at once
2. Compare currency strength data from three different providers
3. Make more informed trading decisions based on consensus across providers
4. Identify discrepancies between data sources 