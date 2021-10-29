import React, { useState } from "react";
import './App.css';
import Weather from "./components/weather.component";
import 'weather-icons/css/weather-icons.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=c65082e510e9cbf36a5cae8041688105&q="
}
const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog"
};
function get_WeatherIcon(weathericon, rangeId) {
  switch (true) {
    case rangeId >= 200 && rangeId < 232:
      return weathericon.Thunderstorm;

    case rangeId >= 300 && rangeId <= 321:
      return weathericon.Drizzle;
    case rangeId >= 500 && rangeId <= 521:
      return weathericon.Rain;

    case rangeId >= 600 && rangeId <= 622:
      return weathericon.Snow;
    case rangeId >= 701 && rangeId <= 781:
      return weathericon.Atmosphere;
    case rangeId === 800:
      return weathericon.Clear;
    case rangeId >= 801 && rangeId <= 804:
      return weathericon.Clouds;
    default:
      return weathericon.Clouds;
  }
}

function date(obj) {
  const date = new Date(obj);
  return date.toDateString();
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    name: "City"
  });
  const [hasFetched, setHasFetched] = useState(false)

  const search = () => {
    fetch(`${api.url}${query}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery("");
        setHasFetched(true)
      });
  };

  const hasWeatherData = hasFetched && !!weather.main;
  const hasError = hasFetched && !weather.main;

  return (
    <div className="App">
      <div className="jumbotron">
        <h3 className="display-4">Weather App</h3>
        <p className="lead">A simple Web app which shows you weather by City Name.This uses OpenWeatherAPI made by ReactJS</p>
      </div>
      <input
        name="city"
        type="text"
        className="form-control"
        placeholder="Search for a City.."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className="btn btn-danger mt-4" onClick={search}>Get Weather</button>
      {(hasWeatherData &&
        <Weather city={weather.name}
          country={weather.sys.country}
          temp={Math.round(weather.main.temp)}
          description={weather.weather[0].main}
          brief={weather.weather[0].description}
          max={Math.round(weather.main.temp_max)}
          min={Math.round(weather.main.temp_min)}
          humidity={weather.main.humidity}
          pressure={Math.round(weather.main.pressure / 1013.25)}
          sunrise={date(weather.sys.sunrise * 1000)}
          sunset={date(weather.sys.sunset * 1000)}
          date={date(weather.dt * 1000)}
          icon={get_WeatherIcon(weatherIcon, weather.weather[0].id)}
        />
      )}
      {hasError && (
        <div className="mt-5">
          <p className="error-message">
            Unfortunately we could not find the city you specified or there was
            an error fetching the weather information
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
