// Weather API integration for real-time data
// This file contains functions to integrate with actual weather APIs

class WeatherService {
  constructor() {
    // You'll need to get API keys from these services:
    this.OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
    this.WEATHERAPI_KEY = 'YOUR_WEATHERAPI_KEY';
    
    this.OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
    this.WEATHERAPI_BASE_URL = 'https://api.weatherapi.com/v1';
  }

  // Get current weather by city name using OpenWeatherMap
  async getCurrentWeatherByCity(cityName) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/weather?q=${cityName}&appid=${this.OPENWEATHER_API_KEY}&units=metric&lang=hi`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat, lon) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.OPENWEATHER_API_KEY}&units=metric&lang=hi`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching current weather by coords:', error);
      throw error;
    }
  }

  // Get 5-day weather forecast
  async getForecastByCity(cityName) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/forecast?q=${cityName}&appid=${this.OPENWEATHER_API_KEY}&units=metric&lang=hi`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  // Get forecast by coordinates
  async getForecastByCoords(lat, lon) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.OPENWEATHER_API_KEY}&units=metric&lang=hi`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast by coords:', error);
      throw error;
    }
  }

  // Alternative: Using WeatherAPI.com (more detailed data)
  async getWeatherFromWeatherAPI(cityName) {
    try {
      const response = await fetch(
        `${this.WEATHERAPI_BASE_URL}/forecast.json?key=${this.WEATHERAPI_KEY}&q=${cityName}&days=5&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather from WeatherAPI:', error);
      throw error;
    }
  }

  // Get air quality data (useful for farming)
  async getAirQuality(lat, lon) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.OPENWEATHER_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Air quality data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  }

  // Get UV Index (important for farming activities)
  async getUVIndex(lat, lon) {
    try {
      const response = await fetch(
        `${this.OPENWEATHER_BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${this.OPENWEATHER_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('UV index data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching UV index:', error);
      throw error;
    }
  }

  // Convert weather data to farming-friendly format
  formatWeatherForFarmers(weatherData) {
    return {
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: weatherData.wind.deg,
      visibility: weatherData.visibility / 1000, // Convert to km
      cloudiness: weatherData.clouds.all,
      sunrise: new Date(weatherData.sys.sunrise * 1000),
      sunset: new Date(weatherData.sys.sunset * 1000),
      weatherMain: weatherData.weather[0].main,
      weatherDescription: weatherData.weather[0].description,
      weatherIcon: weatherData.weather[0].icon
    };
  }

  // Generate farming recommendations based on weather
  generateFarmingRecommendations(weatherData) {
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const weatherMain = weatherData.weather[0].main.toLowerCase();
    const recommendations = [];

    // Temperature-based recommendations
    if (temp > 35) {
      recommendations.push({
        type: 'warning',
        title: '🌡️ अत्यधिक गर्मी चेतावनी',
        message: 'फसलों को तेज धूप से बचाने के लिए छायादार जाल का उपयोग करें। सुबह-शाम सिंचाई करें।'
      });
    } else if (temp < 5) {
      recommendations.push({
        type: 'warning',
        title: '❄️ ठंड चेतावनी',
        message: 'फसलों को पाले से बचाने के लिए धुआं करें या स्प्रिंकलर का उपयोग करें।'
      });
    }

    // Humidity-based recommendations
    if (humidity > 80) {
      recommendations.push({
        type: 'caution',
        title: '💧 उच्च आर्द्रता',
        message: 'फंगल रोगों का खतरा बढ़ा है। फसलों पर नियमित निगरानी रखें और आवश्यक दवा का छिड़काव करें।'
      });
    }

    // Weather-specific recommendations
    if (weatherMain.includes('rain')) {
      recommendations.push({
        type: 'info',
        title: '🌧️ बारिश की संभावना',
        message: 'खेतों में जल निकासी की व्यवस्था करें। बारिश के पानी को संग्रहीत करने का इंतजाम करें।'
      });
    }

    // Wind-based recommendations
    if (windSpeed > 10) {
      recommendations.push({
        type: 'caution',
        title: '💨 तेज हवा',
        message: 'फसलों को हवा से होने वाले नुकसान से बचाने के लिए सहारा दें। कीटनाशक का छिड़काव न करें।'
      });
    }

    return recommendations;
  }
}

// Usage example:
/*
const weatherService = new WeatherService();

// Get weather for a city
weatherService.getCurrentWeatherByCity('Delhi')
  .then(data => {
    const formattedData = weatherService.formatWeatherForFarmers(data);
    const recommendations = weatherService.generateFarmingRecommendations(data);
    console.log('Weather:', formattedData);
    console.log('Recommendations:', recommendations);
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeatherService;
}