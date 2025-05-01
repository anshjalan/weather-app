const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
//Initially, oldTab is userTab
let oldTab = userTab;
//API key for open weather map
const API_KEY = "c2fbe58c57841bf63a954c4d4a2b1c19";
//Initially, old tab is active
oldTab.classList.add("current-tab");

//If coordinates are already present in session storage, then fetch the weather info
//otherwise show grant access container
getfromSessionStorage();

//Function to switch between user and search tab
function switchTab(newTab) {
    //if new tab is not equal to old tab, then only we need to switch
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //If search form container is invisible, make it visible, and make your weather section invisible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //If search form is visible, make it invisible and make your weather container visible 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //Now display the weather of user's location
            //Search in session storage for coordinates, if we have saved them there.
            getfromSessionStorage();
        }
    }
}
//Event listeners for user and search tab
userTab.addEventListener("click", () => {
    switchTab(userTab);
});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

//function to check if coordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //If coordinates are not present, then show grant access container
        grantAccessContainer.classList.add("active");
    }
    else {
        //If coordinates are present, then fetch the weather info
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

//Function to fetch weather info of user - API CALL
async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    try {
        // Fetch current weather data
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        
        // Fetch air pollution data
        const pollutionResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const pollutionData = await pollutionResponse.json();

        // Fetch weather alerts (One Call API or OneCall 3.0)
        const alertsResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const alertsData = await alertsResponse.json();


        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        
        // Render all data
        renderWeatherInfo(weatherData);
        renderPollutionInfo(pollutionData);
        renderWeatherAlerts(alertsData.alerts || []);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        console.error("An error occurred:", err);
        alert("An error occurred while fetching weather data. Please try again.");
    }
}

//Function to display the weather info on UI
function renderWeatherInfo(weatherInfo) {
    //firstly, we have to fetch the elements 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherInfo object and put it UI elements
    cityName.innerText = weatherInfo?.name || 'Unknown Location';
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description || 'Unknown';
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;
    temp.innerText = `${Math.round(weatherInfo?.main?.temp || 0)} °C`;
    windspeed.innerText = `${(weatherInfo?.wind?.speed || 0).toFixed(1)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity || 0}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all || 0}%`;
}

// Function to display the air pollution data
function renderPollutionInfo(pollutionData) {
    const pm25Element = document.querySelector("[data-pm25]");
    const pm10Element = document.querySelector("[data-pm10]");
    const no2Element = document.querySelector("[data-no2]");
    const o3Element = document.querySelector("[data-o3]");
    const aqiGauge = document.querySelector("[data-aqi-gauge]");
    const aqiLevel = document.querySelector("[data-aqi-level]");
    
    // Extract pollution values
    const pollutionValues = pollutionData?.list?.[0]?.components;
    const aqi = pollutionData?.list?.[0]?.main?.aqi || 1;
    
    // Set pollution data
    pm25Element.innerText = `${(pollutionValues?.pm2_5 || 0)} μg/m³`;
    pm10Element.innerText = `${(pollutionValues?.pm10 || 0)} μg/m³`;
    no2Element.innerText = `${(pollutionValues?.no2 || 0)} μg/m³`;
    o3Element.innerText = `${(pollutionValues?.o3 || 0)} μg/m³`;
    
    // Set AQI gauge and level
    const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    const aqiColors = ["var(--success)", "#8BC34A", "var(--warning)", "#FF5722", "var(--danger)"];
    
    // Normalize AQI to percentage for gauge width (1-5 scale to 0-100%)
    const gaugePercentage = ((aqi - 1) / 4) * 100;
    aqiGauge.style.width = `${gaugePercentage}%`;
    aqiGauge.style.backgroundColor = aqiColors[aqi - 1];
    aqiLevel.innerText = aqiLevels[aqi - 1];
    aqiLevel.style.color = aqiColors[aqi - 1];
    
    // Position the level text based on the gauge width
    aqiLevel.style.left = `${Math.min(Math.max(gaugePercentage, 0), 90)}%`;
}

// Function to render weather alerts
function renderWeatherAlerts(alertData = []) {
    const alertsContainer = document.querySelector("[data-alerts-container]");
    const alertsContent = document.querySelector("[data-alerts-content]");
    
    alertsContent.innerHTML = ''; // Clear previous alerts

    if (!alertData || alertData.length === 0) {
        alertsContent.innerHTML = `<p class="no-alerts-msg">No active weather alerts</p>`;
        return;
    }

    alertData.forEach(alert => {
        const alertItem = document.createElement("div");
        alertItem.className = "alert-item";

        alertItem.innerHTML = `
            <div class="alert-title">
                <h3>${alert.event}</h3>
                <span class="alert-time">${new Date(alert.start * 1000).toLocaleString()} - ${new Date(alert.end * 1000).toLocaleString()}</span>
            </div>
            <div class="alert-description">${alert.description}</div>
            <div class="alert-source">Source: ${alert.sender_name}</div>
        `;

        alertsContent.appendChild(alertItem);
    });
}


//Function to find user location
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("Geolocation not available!");
        alert("Geolocation not available!");
        //show grant access container
        grantAccessContainer.classList.add("active");
        //make user info container invisible
        userInfoContainer.classList.remove("active");
        loadingScreen.classList.remove("active");
    }
}

//Function to show position
//This function will be called when user allows location access
function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

//Function to fetch weather info of searched city
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    console.log("Fetching weather info for city:", city);

    try {
        // First get coordinates from city name
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        console.log(geoData);
        if(!geoData || geoData.length === 0) {
            throw new Error("City not found");
        }
        
        const { lat, lon } = geoData[0];
        console.log(lat, lon);
        // Fetch current weather data
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        
        // Fetch air pollution data
        const pollutionResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const pollutionData = await pollutionResponse.json();

        // Fetch weather alerts (One Call API or OneCall 3.0)
        const alertsResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const alertsData = await alertsResponse.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        
        // Render all data
        renderWeatherInfo(weatherData);
        renderPollutionInfo(pollutionData);
        renderWeatherAlerts(alertsData.alerts || []);
    }
    catch(err) {
        console.error("An error occurred:", err);
        loadingScreen.classList.remove("active");
        alert("Unable to find the city. Please try again with a valid city name.");
    }
}
//Event listener for grant access button
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

//Event listener for search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value.trim();

    if(cityName === "") {
        return;
    } 
    else {
        fetchSearchWeatherInfo(cityName);
    }
});