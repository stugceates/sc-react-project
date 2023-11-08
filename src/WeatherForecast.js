import React, { useState } from "react";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  function day() {
    let day = props.data.time.getDay();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
  }
  let loaded = useState(false);
  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          <div className="col">
            <div className="WeatherForecast-day">{day()}</div>
            <img src={props.data.icon_url} alt=" " />
            <div className="WeatherForecast-temperatures">
              <span className="WeatherForecast-temperature-max">
                {props.data.maximum}
              </span>
              {" / "}
              <span className="WeatherForecast-temperature-min">
                {props.data.minimum}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
