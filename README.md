

---

# Weather App

A modern, responsive weather dashboard built with vanilla JavaScript and the OpenWeatherMap API. The application features a custom sunset-themed UI with glassmorphism elements and dynamic weather data retrieval.

## Features

* **Real-time Data:** Fetches current weather conditions, including temperature, humidity, and descriptions using the OpenWeatherMap API.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices using CSS Media Queries.
* **Custom Aesthetics:** Features a sunset-inspired gradient background with a peach-toned glassmorphism card.
* **Visual Effects:** Includes custom CSS animations for weather icons and a star-dust particle effect at the top of the interface.
* **Unit Conversion:** Automatically converts Kelvin temperatures from the API into Celsius for the end user.

## Technical Stack

* **Frontend:** HTML5, CSS3 (Flexbox, Media Queries, Keyframe Animations)
* **Scripting:** JavaScript (ES6+), Fetch API, Async/Await
* **Data Source:** OpenWeatherMap API

## Installation and Setup

1. Clone the repository to your local machine:
```bash
git clone https://github.com/Gevans4352/Weather-app.git

```


2. Navigate to the project directory:
```bash
cd Weather-app

```


3. Open `index.html` in your preferred web browser.

## Configuration

The application logic is contained within the following structure:

* **getweatherData(city):** Handles the asynchronous fetch request to the API.
* **displayweatherInfo(data):** Dynamically creates and injects HTML elements into the DOM with specific CSS classes for styling.
* **getweatherEmoji(weatherId):** Logic-based function that maps OpenWeather condition IDs to the appropriate visual representation.

## UI Design

The interface uses a specific color palette to ensure readability while maintaining a unique atmosphere:

* **Background:** A linear split gradient (Yellow/White/Purple).
* **Card:** A peach-to-orange gradient with a backdrop blur filter.
* **Typography:** Utilizes Deep Plum (#4a304d) for high-contrast readability against warm background tones.

## License

Distributed under the MIT License. See LICENSE for more information.

---
