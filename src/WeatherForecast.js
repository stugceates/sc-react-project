import React from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  if (props.isLoaded) {
    const daily = props.data.slice(0, 5);
    return (
      <div className="WeatherForecast">
        <div className="row">
          {daily.map((forecast, i) => {
            return (
              <div className="col" key={i}>
                <WeatherForecastDay data={forecast} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
