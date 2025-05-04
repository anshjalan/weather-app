import { historicalWeatherData } from './historicalData.js';

// Check if city is one of our special cities with historical data
export function isSpecialCity(cityName) {
    const normalizedCity = cityName.toLowerCase().trim();
    return Object.keys(historicalWeatherData).includes(normalizedCity);
}

// Get weather prediction based on historical data for the current month
export function getHistoricalPrediction(cityName) {
    const normalizedCity = cityName.toLowerCase().trim();
    
    if (!historicalWeatherData[normalizedCity]) {
        return null; // Not a special city
    }
    
    // Get current month (0-11)
    const currentMonth = new Date().getMonth();
    
    // Get historical data for this month
    const monthlyData = historicalWeatherData[normalizedCity].data[currentMonth];
    const weatherDescription = historicalWeatherData[normalizedCity].descriptions[currentMonth];
    const weatherIcon = historicalWeatherData[normalizedCity].icons[currentMonth];
    const alerts = historicalWeatherData[normalizedCity].alerts[currentMonth] || [];
    
    // Extract data from the array
    const [temp, humidity, windspeed, cloudiness, aqi, pm2_5, pm10, no2, o3] = monthlyData;
    
    // Add small random variations to make predictions feel more realistic
    const tempVariation = Math.round((Math.random() * 4) - 2);
    const humidityVariation = Math.round((Math.random() * 10) - 5);
    const windVariation = ((Math.random() * 1) - 0.5).toFixed(1);
    const cloudVariation = Math.round((Math.random() * 15) - 5);
    
    // Create weather data object
    const weatherData = {
        weather: {
            name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
            sys: { country: "in" },
            weather: [{ 
                description: weatherDescription, 
                icon: weatherIcon 
            }],
            main: { 
                temp: temp + tempVariation, 
                humidity: Math.min(100, Math.max(0, humidity + humidityVariation)) 
            },
            wind: { speed: Math.max(0, parseFloat(windspeed) + parseFloat(windVariation)) },
            clouds: { all: Math.min(100, Math.max(0, cloudiness + cloudVariation)) }
        },
        pollution: {
            list: [{
                main: { aqi: aqi },
                components: {
                    pm2_5: pm2_5,
                    pm10: pm10,
                    no2: no2,
                    o3: o3
                }
            }]
        },
        alerts: alerts.map(alert => ({
            ...alert,
            start: Math.floor(Date.now() / 1000),
            end: Math.floor(Date.now() / 1000) + 86400, // 24 hours alert
        }))
    };
    
    return weatherData;
}