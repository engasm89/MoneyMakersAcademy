# Forex Pulse Check Daily

A dashboard to analyze currency strength and get trade recommendations based on real-time forex data.

## Features

- Real-time forex data using Alpha Vantage API
- Currency strength analysis
- Trade recommendations based on strongest vs weakest currencies
- Entry condition checks
- Automatic data refresh

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Deployment Instructions for Updated Edge Function

### Using Supabase Dashboard

1. Navigate to your Supabase project dashboard
2. Go to the "Edge Functions" section
3. Find the "fetch-forex-data" function
4. Click "Edit Code" or similar button
5. Replace the code with the updated version that uses Alpha Vantage API
6. Deploy the function

### Using Supabase CLI

If you prefer using the Supabase CLI:

1. Install Supabase CLI if you haven't already:
   ```
   npm install -g supabase
   ```

2. Login to Supabase:
   ```
   supabase login
   ```

3. Link your project:
   ```
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Deploy the updated function:
   ```
   supabase functions deploy fetch-forex-data
   ```

## Alpha Vantage API

This project uses the Alpha Vantage API to fetch real-time forex data. The API key is already configured in the Edge Function.

Note: Alpha Vantage has rate limits on their free tier (typically 5 calls per minute and 500 calls per day). The application implements caching to minimize API calls.

## About the Data

The application fetches the following data:

1. Currency performance data for 8 major currencies (USD, EUR, GBP, JPY, CAD, AUD, CHF, NZD)
2. Calculates daily percent changes using close prices
3. Identifies the strongest and weakest currencies
4. Generates trade recommendations based on the strongest vs weakest pair

## Troubleshooting

If you encounter any issues with the API:

1. Check the Alpha Vantage API status at https://www.alphavantage.co/
2. Verify if you've exceeded the rate limits (5 calls per minute, 500 calls per day on free tier)
3. The application will show a toast notification if there are any errors fetching the data
