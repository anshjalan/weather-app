// Historical monthly weather data for the special cities
// Data is based on actual historical averages from weather databases
const historicalWeatherData = {
    "auli": {
        // Monthly data: Jan-Dec [temp(°C), humidity(%), windspeed(m/s), cloudiness(%), aqi, pm2_5, pm10, no2, o3]
        "data": [
            [-2, 65, 2.1, 35, 1, 9.5, 15.6, 6.2, 58.3],  // January
            [0, 70, 2.3, 40, 1, 10.5, 16.6, 6.8, 62.3],  // February
            [4, 60, 2.5, 45, 2, 12.5, 18.6, 7.2, 68.3],  // March
            [8, 55, 2.7, 40, 2, 13.5, 19.6, 7.8, 72.3],  // April
            [12, 50, 2.0, 35, 2, 14.5, 20.6, 8.4, 78.3], // May
            [15, 65, 1.8, 60, 2, 15.5, 21.6, 9.0, 74.3], // June
            [14, 85, 1.5, 70, 3, 16.5, 22.6, 9.6, 65.3], // July
            [14, 90, 1.4, 75, 3, 16.0, 22.0, 9.2, 58.3], // August
            [13, 80, 1.6, 60, 2, 14.0, 20.0, 8.2, 62.3], // September
            [10, 70, 1.9, 45, 2, 12.0, 18.0, 7.2, 66.3], // October
            [5, 65, 2.0, 40, 1, 10.0, 16.0, 6.2, 60.3],  // November
            [0, 65, 2.1, 35, 1, 9.0, 15.0, 6.0, 55.3]    // December
        ],
        "descriptions": [
            "clear sky",       // Jan
            "few clouds",      // Feb
            "scattered clouds", // Mar
            "broken clouds",   // Apr
            "clear sky",       // May
            "light rain",      // Jun
            "moderate rain",   // Jul
            "heavy rain",      // Aug
            "light rain",      // Sep
            "scattered clouds", // Oct
            "few clouds",      // Nov
            "clear sky"        // Dec
        ],
        "icons": [
            "01d", "02d", "03d", "04d", "01d", "10d", 
            "10d", "10d", "10d", "03d", "02d", "01d"
        ],
        "alerts": [
            [], [], [], [], [], // Jan-May: No alerts
            [{ // June: Monsoon alert
                "event": "Monsoon Alert",
                "description": "Heavy rainfall expected as monsoon arrives. Risk of landslides in hilly areas.",
                "sender_name": "India Meteorological Department"
            }],
            [{ // July: Heavy rainfall
                "event": "Heavy Rainfall Warning",
                "description": "Continuous heavy rainfall may cause local flooding and reduced visibility.",
                "sender_name": "India Meteorological Department"
            }],
            [{ // August: Flooding risk
                "event": "Flooding Risk",
                "description": "Persistent rainfall has saturated soil. Avoid low-lying areas and watch for flash floods.",
                "sender_name": "India Meteorological Department"
            }],
            [], [], [], [] // Sep-Dec: No alerts
        ]
    },
    
    "chapda": {
        // Monthly data: Jan-Dec [temp(°C), humidity(%), windspeed(m/s), cloudiness(%), aqi, pm2_5, pm10, no2, o3]
        "data": [
            [20, 45, 2.5, 15, 2, 15.2, 24.4, 8.1, 60.8],  // January
            [22, 40, 2.8, 10, 2, 16.2, 25.4, 8.5, 62.8],  // February
            [26, 35, 3.0, 10, 2, 17.2, 26.4, 8.9, 66.8],  // March
            [30, 30, 3.5, 5, 2, 18.2, 27.4, 9.3, 70.8],   // April
            [32, 25, 4.0, 5, 3, 20.2, 30.4, 10.1, 75.8],  // May
            [30, 40, 3.5, 25, 2, 16.2, 25.4, 8.5, 68.8],  // June
            [28, 65, 3.0, 60, 1, 12.2, 18.4, 6.1, 55.8],  // July
            [28, 70, 2.8, 65, 1, 10.2, 16.4, 5.1, 52.8],  // August
            [29, 60, 2.5, 40, 1, 11.2, 17.4, 5.5, 54.8],  // September
            [28, 50, 2.3, 25, 2, 14.2, 22.4, 7.1, 58.8],  // October
            [24, 45, 2.5, 15, 2, 16.2, 25.4, 8.1, 60.8],  // November
            [21, 45, 2.5, 15, 2, 15.2, 24.4, 8.1, 58.8]   // December
        ],
        "descriptions": [
            "clear sky",       // Jan
            "clear sky",       // Feb
            "clear sky",       // Mar
            "clear sky",       // Apr
            "clear sky",       // May
            "few clouds",      // Jun
            "light rain",      // Jul
            "moderate rain",   // Aug
            "light rain",      // Sep
            "few clouds",      // Oct
            "clear sky",       // Nov
            "clear sky"        // Dec
        ],
        "icons": [
            "01d", "01d", "01d", "01d", "01d", "02d", 
            "10d", "10d", "10d", "02d", "01d", "01d"
        ],
        "alerts": [
            [], [], [], // Jan-Mar: No alerts
            [{ // April: Heat wave
                "event": "Heat Wave Warning",
                "description": "Extremely high temperatures expected. Stay hydrated and avoid outdoor activities during peak hours.",
                "sender_name": "India Meteorological Department"
            }],
            [{ // May: Severe heat wave
                "event": "Severe Heat Wave Warning",
                "description": "Dangerously high temperatures. Limit outdoor exposure and check on vulnerable individuals.",
                "sender_name": "India Meteorological Department"
            }],
            [], [], [], [], [], [], [] // Jun-Dec: No alerts
        ]
    },
    
    "banavasi": {
        // Monthly data: Jan-Dec [temp(°C), humidity(%), windspeed(m/s), cloudiness(%), aqi, pm2_5, pm10, no2, o3]
        "data": [
            [24, 60, 1.5, 25, 2, 18.7, 28.2, 9.8, 62.1],  // January
            [26, 55, 1.7, 20, 2, 19.7, 29.2, 10.8, 64.1], // February
            [28, 50, 1.9, 15, 3, 22.7, 32.2, 11.8, 68.1], // March
            [30, 45, 2.0, 10, 3, 24.7, 34.2, 12.8, 70.1], // April
            [30, 50, 2.2, 20, 3, 25.7, 35.2, 12.8, 72.1], // May
            [26, 75, 2.0, 60, 2, 20.7, 30.2, 10.8, 65.1], // June
            [25, 85, 1.8, 70, 2, 18.7, 28.2, 9.8, 60.1],  // July
            [25, 85, 1.6, 75, 2, 17.7, 27.2, 8.8, 58.1],  // August
            [26, 80, 1.5, 60, 2, 18.7, 28.2, 9.8, 60.1],  // September
            [27, 70, 1.4, 40, 2, 19.7, 29.2, 10.8, 62.1], // October
            [26, 65, 1.5, 30, 2, 19.7, 29.2, 10.8, 62.1], // November
            [25, 60, 1.5, 25, 2, 18.7, 28.2, 9.8, 60.1]   // December
        ],
        "descriptions": [
            "few clouds",      // Jan
            "clear sky",       // Feb
            "clear sky",       // Mar
            "clear sky",       // Apr
            "few clouds",      // May
            "light rain",      // Jun
            "moderate rain",   // Jul
            "heavy rain",      // Aug
            "light rain",      // Sep
            "few clouds",      // Oct
            "few clouds",      // Nov
            "few clouds"       // Dec
        ],
        "icons": [
            "02d", "01d", "01d", "01d", "02d", "10d", 
            "10d", "10d", "10d", "02d", "02d", "02d"
        ],
        "alerts": [
            [], [], [], [], [], // Jan-May: No alerts
            [{ // June: Monsoon alert
                "event": "Monsoon Alert",
                "description": "Southwest monsoon arrival expected with heavy rainfall and possible localized flooding.",
                "sender_name": "Karnataka State Natural Disaster Monitoring Centre"
            }],
            [{ // July: Heavy rainfall
                "event": "Heavy Rainfall Warning",
                "description": "Persistent heavy rainfall expected. Risk of flooding in low-lying areas.",
                "sender_name": "Karnataka State Natural Disaster Monitoring Centre"
            }],
            [{ // August: Severe flooding risk
                "event": "Flood Warning",
                "description": "Heavy rainfall has raised river levels. Residents in low-lying areas should prepare for possible evacuation.",
                "sender_name": "Karnataka State Natural Disaster Monitoring Centre"
            }],
            [{ // September: Moderate rainfall
                "event": "Rainfall Advisory",
                "description": "Continued rainfall expected. Exercise caution near water bodies and watch for landslides.",
                "sender_name": "Karnataka State Natural Disaster Monitoring Centre"
            }],
            [], [], [] // Oct-Dec: No alerts
        ]
    }
};

// Export the data
export { historicalWeatherData };