import React, { useState } from "react";
import "./App.css";
import Weather from "./components/weather.component";
import Header from "./components/Header";
import "weather-icons/css/weather-icons.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

const api = {
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=c65082e510e9cbf36a5cae8041688105&q=",
};
const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog",
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
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    name: "City",
  });

  const search = () => {
    try {
      setLoading(true);
      fetch(`${api.url}${query}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setLoading(false);

        });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
      <Header />
      <form
        style={{ marginTop: "30px" }}
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          name="city"
          type="text"
          className="form-control"
          placeholder="Search for a City.."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-danger mt-4" onClick={search}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>
      {typeof weather.main != "undefined" ? (
        <Weather
          city={weather.name}
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
      ) : <Weather />}
      <Footer />
    </div>
  );
}
export default App;
