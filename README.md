# sahayak

## Weather Integration Setup

To enable real-time weather forecasting, you'll need to:

1. **Get API Keys:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) for free API access
   - Alternative: Sign up at [WeatherAPI](https://www.weatherapi.com/) for more detailed data

2. **Update API Keys:**
   - Open `weather-api.js`
   - Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key
   - Replace `YOUR_WEATHERAPI_KEY` with your WeatherAPI key (if using)

3. **Features Included:**
   - Current weather conditions
   - 5-day weather forecast
   - Location-based weather (GPS)
   - Farming recommendations based on weather
   - Hindi language support
   - Mobile-responsive design

4. **API Endpoints Used:**
   - Current Weather: `https://api.openweathermap.org/data/2.5/weather`
   - 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`
   - Air Quality: `https://api.openweathermap.org/data/2.5/air_pollution`
   - UV Index: `https://api.openweathermap.org/data/2.5/uvi`

5. **Usage:**
   - Navigate to the weather page from the home page
   - Search by city name or use current location
   - View detailed weather information and farming tips

The weather feature is currently running with mock data for demonstration. Replace the mock functions with real API calls once you have valid API keys.