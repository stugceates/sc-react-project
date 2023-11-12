import React, { useState } from "react";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  let comp = null;
  function day(time) {
    if (time) {
      let day = time.getDay();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[day];
    }
  }
  if (props.isLoaded) {
    const forecastDailyData = props.data.map(function (forecast) {
      const time = new Date(forecast.time * 1000);

      return {
        time: time,
        maximum: Math.round(forecast.temperature.maximum),
        minimum: Math.round(forecast.temperature.minimum),
        icon_url: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecast.condition.icon}.png`,
        day: day(time),
      };
    });

    comp = forecastDailyData.map(function (forecast, i) {
      if (i < 5) {
        return (
          <div className="col" key={forecast.day}>
            <div className="WeatherForecast-day">{forecast.day}</div>
            <img src={forecast.icon_url} alt=" " />
            <div className="WeatherForecast-temperatures">
              <span className="WeatherForecast-temperature-max">
                {forecast.maximum}
              </span>
              {" / "}
              <span className="WeatherForecast-temperature-min">
                {forecast.minimum}
              </span>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div className="WeatherForecast">
      <div className="row">{comp}</div>
    </div>
  );
}
