export default function WeatherForecastDay(props) {
  function day() {
    const time = new Date(props.data.time * 1000);
    let day = time.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function max() {
    return Math.round(props.data.temperature.maximum);
  }

  function min() {
    return Math.round(props.data.temperature.minimum);
  }

  function icon() {
    return `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.data.condition.icon}.png`;
  }

  return (
    <>
      <div className="WeatherForecast-day">{day()}</div>
      <img src={icon()} alt=" " />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">{max()}</span>
        {" / "}
        <span className="WeatherForecast-temperature-min">{min()}</span>
      </div>
    </>
  );
}
