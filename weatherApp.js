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

document.addEventListener('DOMContentLoaded', () => {
    applyTheme('default');
    console.log('Default theme initialized');
});

// API & DOM ELEMENTS
const apiKey = "163f018a71acb350b1a60cc0df917d22";
const card = document.querySelector(".Card");
const navSearchInput = document.querySelector(".navSearchInput");
const autocompleteDropdown = document.querySelector(".autocomplete-dropdown");
const weatherIcon = document.createElement("img");

weatherIcon.classList.add("weatherEmoji");
let searchTimeout;

// ========================================
// WEATHER TIPS DATABASE
// ========================================

const weatherTips = {
    sunny: [
        "Stay hydrated, drink water every 2 hours",
        "Apply SPF 30+ sunscreen if going outside",
        "Avoid direct sun between 12pm - 3pm",
        "Wear light, breathable clothing",
        "Seek shade when possible"
    ],
    cloudy: [
        "Good day for outdoor activities",
        "UV rays can still penetrate clouds - consider sunscreen",
        "Perfect weather for a walk or exercise",
        "Keep a light jacket handy"
    ],
    rainy: [
        "Carry an umbrella or raincoat",
        "Drive carefully - roads may be slippery",
        "Avoid flooded areas",
        "Perfect day for indoor activities",
        "Keep electronics dry"
    ],
    stormy: [
        "Stay indoors if possible",
        "Avoid using electrical appliances during lightning",
        "Stay away from windows",
        "Do not take shelter under trees",
        "Emergency numbers should be handy"
    ],
    snow: [
        "Bundle up in layers",
        "Wear waterproof boots",
        "Drive slowly and carefully",
        "Watch for icy patches",
        "Keep warm beverages handy"
    ],
    default: [
        "Check weather updates regularly",
        "Dress appropriately for the conditions",
        "Stay safe and prepared"
    ]
};

// Function to get tips based on weather theme
function getTipsForWeather(themeName) {
    return weatherTips[themeName] || weatherTips.default;
}

// ========================================
// RELATED LOCATIONS HELPER FUNCTIONS
// ========================================

// Fetch weather for multiple locations
async function fetchMultipleWeatherData(locations) {
    const weatherPromises = locations.map(async (location) => {
        try {
            const data = await getweatherData(location);
            return {
                name: data.name,
                temp: (data.main.temp - 273.15).toFixed(1),
                condition: data.weather[0].main,
                icon: getWeatherIcon(data.weather[0].id),
                fullData: data
            };
        } catch (error) {
            console.error(`Error fetching weather for ${location}:`, error);
            return null;
        }
    });
    
    const results = await Promise.all(weatherPromises);
    return results.filter(result => result !== null);
}
async function displayRelatedLocations(locations) {
    const relatedSection = document.querySelector('.related-locations-section');
    const locationsGrid = document.querySelector('.locations-grid');
    if (locations.length === 0) {
        relatedSection.style.display = 'none';
        return;
    }
    locationsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-secondary);">Loading nearby locations...</p>';
    relatedSection.style.display = 'block';
    const weatherData = await fetchMultipleWeatherData(locations);
    locationsGrid.innerHTML = '';
    weatherData.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.classList.add('location-card');
        const icon = document.createElement('img');
        icon.src = location.icon;
        icon.style.width = '50px';
        icon.style.height = '50px';
        icon.style.margin = '10px 0'; 
        locationCard.innerHTML = `
            <div class="location-card-name">${location.name}</div>
            <div class="location-card-temp">${location.temp}°C</div>
        `;
        locationCard.insertBefore(icon, locationCard.querySelector('.location-card-temp'));
        locationCard.addEventListener('click', async () => {
            await searchWeather(location.name);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        locationsGrid.appendChild(locationCard);
    });
}
function displayWeatherTips(themeName) {
    const tipsSection = document.querySelector('.weather-tips-section');
    const tipsContent = document.querySelector('.tips-content');
    if (!tipsSection || !tipsContent) {
        console.error('Tips section not found in HTML');
        return;
    }
    const tips = getTipsForWeather(themeName);
    tipsContent.innerHTML = '';
    tips.forEach(tip => {
        const tipItem = document.createElement('div');
        tipItem.classList.add('tip-item');
        tipItem.textContent = tip;
        tipsContent.appendChild(tipItem);
    });
    tipsSection.style.display = 'block';
}



// Helper function to get related cities based on country
async function getRelatedCitiesForCountry(countryCode, currentCity) {
    // Hardcoded major cities for popular countries
   const majorCitiesByCountry = {
  'NG': ['Lagos','Abuja','Kano','Ibadan','Port Harcourt','Benin City','Kaduna','Enugu','Onitsha','Owerri','Aba','Uyo','Calabar','Akure','Ado-Ekiti','Ilorin','Ogbomosho','Ife','Ilesa','Oshogbo','Owo','Warri','Asaba','Lokoja','Makurdi','Minna','Yola','Gombe','Bauchi','Jos','Zaria','Katsina','Sokoto','Birnin Kebbi','Gusau','Damaturu','Maiduguri'],
  'GH': ['Accra','Kumasi','Tamale','Takoradi','Cape Coast','Tema','Koforidua','Sunyani','Ho','Bolgatanga','Wa','Techiman','Obuasi','Nkawkaw','Sefwi Wiawso'],
  'US': ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose','Austin','Seattle','San Francisco','Denver','Boston','Miami','Orlando','Tampa','Atlanta','Nashville','Memphis','Detroit','Cleveland','Columbus','Cincinnati','Indianapolis','Milwaukee','Madison','Minneapolis','St Paul','Kansas City','St Louis','Omaha','Lincoln','Des Moines','Iowa City','Ames'],
  'GB': ['London','Manchester','Birmingham','Liverpool','Leeds','Glasgow','Edinburgh','Bristol','Bath','Oxford','Cambridge','Brighton','Reading','Milton Keynes','Leicester','Nottingham','Derby','Sheffield','York','Hull','Newcastle','Sunderland','Middlesbrough','Durham','Carlisle','Preston','Blackpool','Lancaster','Chester','Wrexham','Cardiff','Swansea','Newport'],
  'CA': ['Toronto','Vancouver','Montreal','Calgary','Ottawa','Edmonton','Quebec City','Winnipeg','Hamilton','Mississauga','Brampton','Oakville','Burlington','Markham','Richmond Hill','Vaughan','Scarborough','North York','Surrey','Burnaby','Richmond','Coquitlam','Langley','Abbotsford','Victoria','Nanaimo','Kelowna'],
  'KE': ['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Malindi','Kitale','Machakos','Athi River','Naivasha','Nyeri','Muranga','Embu','Meru','Isiolo','Nanyuki','Garissa','Wajir','Mandera'],
  'ZA': ['Johannesburg','Cape Town','Durban','Pretoria','Port Elizabeth','Bloemfontein','East London','Nelspruit','Polokwane','Rustenburg','Klerksdorp','Welkom','Kimberley','Upington','George','Mossel Bay','Knysna','Stellenbosch','Paarl','Franschhoek'],
  'EG': ['Cairo','Alexandria','Giza','Shubra El-Kheima','Port Said','Suez','Luxor','Aswan','Hurghada','Sharm El-Sheikh','Mansoura','Tanta','Zagazig','Ismailia','Damietta','Beni Suef','Minya','Sohag','Qena'],
  'FR': ['Paris','Marseille','Lyon','Toulouse','Nice','Nantes','Strasbourg','Bordeaux','Lille','Rouen','Reims','Metz','Nancy','Dijon','Besancon','Clermont-Ferrand','Grenoble','Annecy','Chambery','Aix-en-Provence','Avignon','Arles','Montpellier','Perpignan'],
  'DE': ['Berlin','Hamburg','Munich','Cologne','Frankfurt','Stuttgart','Dusseldorf','Dortmund','Essen','Bochum','Bonn','Aachen','Leipzig','Dresden','Chemnitz','Magdeburg','Halle','Nuremberg','Erlangen','Regensburg','Augsburg','Freiburg','Heidelberg','Mannheim','Karlsruhe'],
  'IT': ['Rome','Milan','Naples','Turin','Palermo','Genoa','Bologna','Florence','Pisa','Siena','Lucca','Venice','Verona','Padua','Vicenza','Trieste','Udine','Trento','Bolzano','Brescia','Bergamo','Como','Lecco'],
  'ES': ['Madrid','Barcelona','Valencia','Seville','Zaragoza','Malaga','Murcia','Bilbao','San Sebastian','Vitoria','Pamplona','Logrono','Santander','Oviedo','Gijon','Leon','Salamanca','Valladolid','Toledo','Cuenca','Albacete','Alicante','Elche','Benidorm'],
  'CN': ['Beijing','Shanghai','Guangzhou','Shenzhen','Chengdu','Hangzhou','Wuhan','Xian','Nanjing','Suzhou','Wuxi','Changzhou','Kunshan','Tianjin','Qingdao','Jinan','Yantai','Dalian','Shenyang','Harbin','Changchun','Hohhot','Baotou'],
  'JP': ['Tokyo','Osaka','Kyoto','Yokohama','Nagoya','Sapporo','Fukuoka','Kobe','Himeji','Nara','Uji','Hiroshima','Okayama','Kurashiki','Takamatsu','Matsuyama','Kochi','Niigata','Kanazawa'],
  'IN': ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Surat','Vadodara','Rajkot','Gandhinagar','Jaipur','Jodhpur','Udaipur','Ajmer','Bikaner','Indore','Bhopal','Gwalior','Jabalpur','Lucknow','Kanpur','Agra','Varanasi','Prayagraj'],
  'AU': ['Sydney','Melbourne','Brisbane','Perth','Adelaide','Gold Coast','Canberra','Hobart','Launceston','Geelong','Ballarat','Bendigo','Shepparton','Albury','Wagga Wagga','Newcastle','Wollongong','Shellharbour'],
  'BR': ['Sao Paulo','Rio de Janeiro','Brasilia','Salvador','Fortaleza','Belo Horizonte','Manaus','Curitiba','Campinas','Santos','Ribeirao Preto','Sorocaba','Guarulhos','Osasco','Niteroi','Petropolis','Nova Iguacu'],
  'MX': ['Mexico City','Guadalajara','Monterrey','Puebla','Tijuana','Leon','Juarez','Zapopan','Aguascalientes','Querétaro','San Luis Potosi','Torreon','Saltillo','Chihuahua','Hermosillo','Culiacan','Mazatlan','Los Mochis']
};

    
    // Get cities for this country
    let cities = majorCitiesByCountry[countryCode] || [];
    
    // Filter out current city
    cities = cities.filter(city => city.toLowerCase() !== currentCity.toLowerCase());
    
    // Return up to 8 cities
    return cities.slice(0, 8);
}

// AUTOCOMPLETE SEARCH
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
    const countriesByContinent = {
        Africa: [
            'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD',
            'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS',
            'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW',
            'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG',
            'ZM', 'ZW'
        ],
        Asia: [
            'AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID',
            'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN',
            'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY',
            'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'
        ],
        Europe: [
            'AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR',
            'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC',
            'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES',
            'SE', 'CH', 'UA', 'GB', 'VA'
        ],
        NorthAmerica: [
            'AI', 'AG', 'AW', 'BS', 'BB', 'BZ', 'BM', 'BQ', 'CA', 'KY', 'CR', 'CU',
            'CW', 'DM', 'DO', 'SV', 'GL', 'GD', 'GP', 'GT', 'HT', 'HN', 'JM', 'MQ', 'MX',
            'MS', 'NI', 'PA', 'PR', 'BL', 'KN', 'LC', 'MF', 'PM', 'VC', 'SX', 'TT', 'TC',
            'US', 'VI'
        ],
        SouthAmerica: [
            'AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'
        ],
        Oceania: [
            'AS', 'AU', 'CK', 'FJ', 'PF', 'GU', 'KI', 'MH', 'FM', 'NR', 'NC', 'NZ', 'NU',
            'NF', 'MP', 'PW', 'PG', 'PN', 'WS', 'SB', 'TK', 'TO', 'TV', 'VU', 'WF'
        ],
        Antarctica: ['AQ']
    };
    
    const allCountryCodes = new Set(Object.values(countriesByContinent).flat());
    const rankedLocations = locations.map(location => {
        let score = 0;
        if (allCountryCodes.has(location.country)) {
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
    const majorLocations = rankedLocations.filter(location => location.state || location.score >= 3).slice(0, 5);
    const smallerLocations = rankedLocations.filter(location => !majorLocations.includes(location)).slice(0, 5);

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
async function searchWeather(city) {
    document.querySelector(".hero").style.display = "none";

    try {
        const weatherData = await getweatherData(city);
        displayweatherInfo(weatherData);
        const weatherCondition = weatherData.weather[0].main;
        const themeName = getThemeFromWeather(weatherCondition);
        applyTheme(themeName);
        updateLocationIndicator(city, weatherData.sys.country);
        const countryCode = weatherData.sys.country;
        const cityName = weatherData.name;
        const relatedCities = await getRelatedCitiesForCountry(countryCode, cityName);
        await displayRelatedLocations(relatedCities);
        displayWeatherTips(themeName);
        
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
async function getweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could Not Fetch Weather Data");
    }
    return await response.json();
}

async function displayweatherInfo(data) {
    const { 
        name: city, 
        main: { temp, humidity }, 
        weather: [{ description, id }] 
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherIcon = document.createElement("img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherIcon.src = getWeatherIcon(id); 
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherIcon.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(weatherIcon);
    card.appendChild(tempDisplay);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "/icons/realthunder.svg";
    else if (weatherId >= 300 && weatherId < 400) return "/icons/cloudonedrop.svg";
    else if (weatherId >= 500 && weatherId < 600) return "/icons/rain.svg";
    else if (weatherId >= 600 && weatherId < 700) return "/icons/snow.svg";
    else if (weatherId >= 700 && weatherId < 800) return "/icons/fog.svg";
    else if (weatherId === 800) return "/icons/suny.svg";
    else if (weatherId >= 801 && weatherId < 810) return "/icons/sunhidingbehindcloud.svg";
    else return "/icons/unknown.svg";
}
const scrollBtn = document.getElementById('scrollBtn');
const locationsGrid = document.getElementById('locationsGrid');

if (scrollBtn && locationsGrid) {
    scrollBtn.addEventListener('click', () => {
        locationsGrid.scrollBy({
            left: 300, 
            behavior: 'smooth'
        });
    });
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}