import React, { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

const apiKey = "fa2f0ab0044e0f6ed0fo3e30511f6tbc";

async function loadWeatherData(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  return axios.get(apiUrl);
}

async function loadForecastData(lat, lon) {
  const forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  return axios.get(forecastApiUrl);
}

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [forecastData, setForecastData] = useState({ ready: false });
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState(props.defaultCity);
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const weather = await loadWeatherData(city);
      setWeatherData({
        ready: true,
        temperature: weather.data.temperature.current,
        wind: weather.data.wind,
        date: new Date(weather.data.time * 1000),
        humidity: weather.data.temperature.humidity,
        city: weather.data.city,
        description: weather.data.condition.description,
        icon_url: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weather.data.condition.icon}.png`,
      });

      const lat = weather.data.coordinates.latitude;
      const lon = weather.data.coordinates.longitude;
      const forecast = await loadForecastData(lat, lon);
      setForecastData(forecast.data.daily);
      setLoaded(true);
    };
    fetchData();
  }, [city]);

  function handleSubmit(event) {
    event.preventDefault();
    setCity(cityInput);
  }

  function handleCityChange(event) {
    setCityInput(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast data={forecastData} isLoaded={loaded} />
      </div>
    );
  } else {
    return "Loading...";
  }
}
