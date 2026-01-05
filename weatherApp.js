
const weatherThemes = {
    default: {
        background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)',
        cardBg: 'rgba(255, 250, 245, 0.85)',
        cardBorder: 'rgba(210, 180, 140, 0.3)',
        textPrimary: '#4a3f35',
        textSecondary: '#6b5d52',
        accentColor: '#d4a574',
        buttonBg: 'linear-gradient(135deg, #c9a882 0%, #b89968 100%)',
        buttonHover: 'linear-gradient(135deg, #b89968 0%, #a78850 100%)',
        shadowColor: 'rgba(74, 63, 53, 0.15)'
    },
    sunny: {
  background: 'linear-gradient(135deg, #ffb347 0%, #ffcc33 45%, #ff9f1c 100%)',
  textPrimary: '#2b1d0e',
  textSecondary: '#4a331a',
  accentColor: '#ff8c1a',
  buttonBg: 'linear-gradient(135deg, #ff9f1c 0%, #ff7a00 100%)',
  buttonHover: 'linear-gradient(135deg, #ff7a00 0%, #e66400 100%)',
  shadowColor: 'rgba(255, 140, 26, 0.35)'
},

    cloudy: {
        background: 'linear-gradient(135deg, #d4dce6 0%, #c5d0db 100%)',
        cardBg: 'rgba(245, 248, 250, 0.85)',
        cardBorder: 'rgba(180, 190, 200, 0.3)',
        textPrimary: '#3d4752',
        textSecondary: '#5d6872',
        accentColor: '#7a8c9e',
        buttonBg: 'linear-gradient(135deg, #8b9fb0 0%, #7a8c9e 100%)',
        buttonHover: 'linear-gradient(135deg, #7a8c9e 0%, #6a7c8e 100%)',
        shadowColor: 'rgba(122, 140, 158, 0.15)'
    },
    rainy: {
        background: 'linear-gradient(135deg, #5a7a9e 0%, #4a6482 100%)',
        cardBg: 'rgba(230, 240, 248, 0.85)',
        cardBorder: 'rgba(90, 122, 158, 0.3)',
        textPrimary: '#2d3e50',
        textSecondary: '#4a5c6e',
        accentColor: '#5a7a9e',
        buttonBg: 'linear-gradient(135deg, #6a8aae 0%, #5a7a9e 100%)',
        buttonHover: 'linear-gradient(135deg, #5a7a9e 0%, #4a6a8e 100%)',
        shadowColor: 'rgba(90, 122, 158, 0.2)'
    },
    stormy: {
        background: 'linear-gradient(135deg, #4a5568 0%, #3a4556 100%)',
        cardBg: 'rgba(225, 230, 235, 0.85)',
        cardBorder: 'rgba(74, 85, 104, 0.3)',
        textPrimary: '#1e2936',
        textSecondary: '#3d4752',
        accentColor: '#5a6a7a',
        buttonBg: 'linear-gradient(135deg, #6a7a8a 0%, #5a6a7a 100%)',
        buttonHover: 'linear-gradient(135deg, #5a6a7a 0%, #4a5a6a 100%)',
        shadowColor: 'rgba(74, 85, 104, 0.25)'
    },
    snow: {
        background: 'linear-gradient(135deg, #e3f2fd 0%, #d4e7f7 100%)',
        cardBg: 'rgba(250, 253, 255, 0.85)',
        cardBorder: 'rgba(180, 210, 235, 0.3)',
        textPrimary: '#2c4a62',
        textSecondary: '#4a6882',
        accentColor: '#6ba5d4',
        buttonBg: 'linear-gradient(135deg, #7bb5e4 0%, #6ba5d4 100%)',
        buttonHover: 'linear-gradient(135deg, #6ba5d4 0%, #5b95c4 100%)',
        shadowColor: 'rgba(107, 165, 212, 0.15)'
    }
};

function applyTheme(themeName) {
    const theme = weatherThemes[themeName] || weatherThemes.default;
    const root = document.documentElement;
    
    root.style.setProperty('--bg-primary', theme.background);
    root.style.setProperty('--bg-secondary', theme.cardBg);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--card-border', theme.cardBorder);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--button-bg', theme.buttonBg);
    root.style.setProperty('--button-hover', theme.buttonHover);
    root.style.setProperty('--shadow-color', theme.shadowColor);
    
    console.log(`Theme applied: ${themeName}`);
}

function getThemeFromWeather(weatherCondition) {
    const condition = weatherCondition.toLowerCase();
    
    if (condition.includes('clear') || condition.includes('sunny')) {
        return 'sunny';
    } 
    else if (condition.includes('cloud')) {
        return 'cloudy';
    } 
    else if (condition.includes('rain') || condition.includes('drizzle')) {
        return 'rainy';
    } 
    else if (condition.includes('thunder') || condition.includes('storm')) {
        return 'stormy';
    } 
    else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
        return 'snow';
    }
    else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
        return 'cloudy'; 
    }
    
    return 'default';
}

// Initialize default theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme('default');
    console.log('Default theme initialized');
});

// ========================================
// API & DOM ELEMENTS
// ========================================

const apiKey = "163f018a71acb350b1a60cc0df917d22";
const card = document.querySelector(".Card");
const navSearchInput = document.querySelector(".navSearchInput");
const autocompleteDropdown = document.querySelector(".autocomplete-dropdown");
const weatherIcon = document.createElement("img");
weatherIcon.src = getWeatherIcon(id);
weatherIcon.alt = description;
weatherIcon.classList.add("weatherEmoji");


let searchTimeout;

// ========================================
// AUTOCOMPLETE SEARCH
// ========================================

navSearchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        hideAutocomplete();
        return;
    }
    
    showLoadingState();
    
    searchTimeout = setTimeout(async () => {
        try {
            const suggestions = await fetchLocationSuggestions(query);
            displaySuggestions(suggestions);
        } catch (error) {
            console.error("Autocomplete error:", error);
            hideAutocomplete();
        }
    }, 300);
});

navSearchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const city = navSearchInput.value.trim();
        if (city) {
            hideAutocomplete();
            await searchWeather(city);
        }
    }
});

async function fetchLocationSuggestions(query) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=50&appid=${apiKey}`;
    
    const response = await fetch(geocodeUrl);
    
    if (!response.ok) {
        throw new Error("Could not fetch location suggestions");
    }
    
    const data = await response.json();
    return rankAndFilterLocations(data, query);
}

function rankAndFilterLocations(locations, query) {
    const africanCountries = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD',
        'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS',
        'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW',
        'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG',
        'ZM', 'ZW'
    ];
    
    const rankedLocations = locations.map(location => {
        let score = 0;
        
        if (africanCountries.includes(location.country)) {
            score += 2;
        }
        
        if (location.name.toLowerCase().startsWith(query.toLowerCase())) {
            score += 3;
        }
        
        if (location.state) {
            score += 1;
        }
        
        return { ...location, score };
    });
    
    rankedLocations.sort((a, b) => b.score - a.score);
    
    const majorLocations = rankedLocations.filter(loc => loc.state || loc.score >= 3).slice(0, 5);
    const smallerLocations = rankedLocations.filter(loc => !majorLocations.includes(loc)).slice(0, 5);
    
    return [...majorLocations, ...smallerLocations].slice(0, 10);
}

function displaySuggestions(suggestions) {
    autocompleteDropdown.innerHTML = "";
    
    if (suggestions.length === 0) {
        autocompleteDropdown.innerHTML = '<div class="autocomplete-item">No results found</div>';
        autocompleteDropdown.style.display = "block";
        return;
    }
    
    suggestions.forEach(location => {
        const item = document.createElement("div");
        item.classList.add("autocomplete-item");
        
        const locationText = location.state 
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`;
        
        item.textContent = locationText;
        
        item.addEventListener("click", async () => {
            navSearchInput.value = location.name;
            hideAutocomplete();
            await searchWeather(location.name);
        });
        
        autocompleteDropdown.appendChild(item);
    });
    
    autocompleteDropdown.style.display = "block";
}

function showLoadingState() {
    autocompleteDropdown.innerHTML = '<div class="autocomplete-item autocomplete-loading">Searching...</div>';
    autocompleteDropdown.style.display = "block";
}

function hideAutocomplete() {
    autocompleteDropdown.style.display = "none";
    autocompleteDropdown.innerHTML = "";
}

document.addEventListener("click", (e) => {
    if (!navSearchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        hideAutocomplete();
    }
});

// ========================================
// MAIN SEARCH FUNCTION
// ========================================

async function searchWeather(city) {
    try {
        const weatherData = await getweatherData(city);
        displayweatherInfo(weatherData);
        
        // Apply theme based on weather
        const weatherCondition = weatherData.weather[0].main;
        const themeName = getThemeFromWeather(weatherCondition);
        applyTheme(themeName);
        
        // Update location indicator
        updateLocationIndicator(city, weatherData.sys.country);
        
    } catch (error) {
        console.error(error);
        displayError(error.message || "Could not fetch weather data");
    }
}

function updateLocationIndicator(city, countryCode) {
    const locationCodeElement = document.querySelector(".location-code");
    const locationTooltipElement = document.querySelector(".location-tooltip");
    
    const shortCode = city.substring(0, 2).toUpperCase();
    
    locationCodeElement.textContent = shortCode;
    locationTooltipElement.textContent = `${city}, ${countryCode}`;
}

// ========================================
// WEATHER API
// ========================================

async function getweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error("Could Not Fetch Weather Data");
    }
    
    return await response.json();
}

async function displayweatherInfo(data) {
    console.log(data); 
    
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data; 
    
    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");   
    const tempDisplay = document.createElement("p");   
    const humidityDisplay = document.createElement("p");   
    const descDisplay = document.createElement("p");   
    const weatherEmoji = document.createElement("p");  
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(tempDisplay);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "/icons/storm.svg";
    else if (weatherId >= 300 && weatherId < 400) return "/icons/drizzle.svg";
    else if (weatherId >= 500 && weatherId < 600) return "/icons/rain.svg";
    else if (weatherId >= 600 && weatherId < 700) return "/icons/snow.svg";
    else if (weatherId >= 700 && weatherId < 800) return "/icons/fog.svg";
    else if (weatherId === 800) return "/icons/sun.svg";
    else if (weatherId >= 801 && weatherId < 810) return "/icons/cloud.svg";
    else return "/icons/unknown.svg";
}


function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}