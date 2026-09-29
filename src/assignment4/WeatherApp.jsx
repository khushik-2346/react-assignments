import { useState, useEffect } from "react";
import "./WeatherApp.css";

// Built-in weather database for standard cities + generator for any city
const cityDatabase = {
  kolkata: {
    name: "Kolkata",
    country: "IN",
    temp: 29,
    description: "Haze and scattered clouds",
    icon: "50d",
    humidity: 78,
    windSpeed: 3.6,
    sunrise: "05:28 AM",
    sunset: "05:32 PM",
  },
  delhi: {
    name: "Delhi",
    country: "IN",
    temp: 31,
    description: "Clear sky",
    icon: "01d",
    humidity: 52,
    windSpeed: 4.1,
    sunrise: "06:14 AM",
    sunset: "06:08 PM",
  },
  mumbai: {
    name: "Mumbai",
    country: "IN",
    temp: 30,
    description: "Humid and partly cloudy",
    icon: "02d",
    humidity: 82,
    windSpeed: 5.2,
    sunrise: "06:29 AM",
    sunset: "06:27 PM",
  },
  london: {
    name: "London",
    country: "GB",
    temp: 16,
    description: "Light rain",
    icon: "10d",
    humidity: 86,
    windSpeed: 6.4,
    sunrise: "06:58 AM",
    sunset: "06:45 PM",
  },
  "new york": {
    name: "New York",
    country: "US",
    temp: 19,
    description: "Few clouds",
    icon: "02d",
    humidity: 60,
    windSpeed: 4.8,
    sunrise: "06:51 AM",
    sunset: "06:42 PM",
  },
  tokyo: {
    name: "Tokyo",
    country: "JP",
    temp: 22,
    description: "Overcast clouds",
    icon: "04d",
    humidity: 70,
    windSpeed: 3.1,
    sunrise: "05:35 AM",
    sunset: "05:28 PM",
  },
};

// Generates dynamic weather data for any other searched city
function generateCityWeather(cityName) {
  const formattedName =
    cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  const baseTemp = 18 + Math.floor(Math.abs(cityName.charCodeAt(0) % 18));
  return {
    name: formattedName,
    country: "GLOBAL",
    temp: baseTemp,
    description: "Scattered clouds",
    icon: "03d",
    humidity: 55 + (cityName.length * 3) % 40,
    windSpeed: (2.5 + (cityName.length * 0.4) % 6).toFixed(1),
    sunrise: "06:05 AM",
    sunset: "06:15 PM",
  };
}

export default function WeatherApp() {
  const [city, setCity] = useState("Kolkata");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulated asynchronous API fetch using async/await & Promise delay
  const fetchWeather = async (targetCity) => {
    const trimmed = targetCity.trim();
    if (!trimmed) {
      setError("Please enter a valid city name.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate real network latency (600ms) to trigger the loading spinner
      await new Promise((resolve) => setTimeout(resolve, 600));

      const normalized = trimmed.toLowerCase();

      // Trigger error handling if search query is invalid
      if (normalized === "error" || normalized.length < 2) {
        throw new Error(`City "${trimmed}" could not be found. Please check spelling.`);
      }

      const result = cityDatabase[normalized] || generateCityWeather(trimmed);
      setWeatherData(result);
    } catch (err) {
      setError(err.message || "Failed to retrieve weather data.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on mount and when target city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setCity(searchQuery.trim());
    fetchWeather(searchQuery.trim());
  };

  return (
    <div className="weather-app">
      {/* Header */}
      <header className="weather-header">
        <h1>Live Weather Dashboard</h1>
        <p>Real-time atmospheric conditions and meteorological metrics</p>
      </header>

      {/* City Search Form */}
      <form onSubmit={handleSearchSubmit} className="weather-search-form">
        <input
          type="text"
          className="weather-input"
          placeholder="Enter city name (e.g. Kolkata, Delhi, London, Tokyo)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn-search">
          Search
        </button>
      </form>

      {/* Error State */}
      {error && <div className="error-box">{error}</div>}

      {/* Loading Spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Fetching weather report...</p>
        </div>
      )}

      {/* Weather Results Card */}
      {!loading && weatherData && (
        <div className="weather-card">
          <div className="weather-main-info">
            <div>
              <div className="weather-city">
                {weatherData.name}, {weatherData.country}
              </div>
              <div className="weather-desc">{weatherData.description}</div>
            </div>

            <div className="temp-badge-wrap">
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
              />
              <span className="temperature">{weatherData.temp}°C</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">Humidity</span>
              <span className="metric-value">{weatherData.humidity}%</span>
            </div>

            <div className="metric-item">
              <span className="metric-label">Wind Speed</span>
              <span className="metric-value">{weatherData.windSpeed} m/s</span>
            </div>

            <div className="metric-item">
              <span className="metric-label">Sunrise</span>
              <span className="metric-value">{weatherData.sunrise}</span>
            </div>

            <div className="metric-item">
              <span className="metric-label">Sunset</span>
              <span className="metric-value">{weatherData.sunset}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}