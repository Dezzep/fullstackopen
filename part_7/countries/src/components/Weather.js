import { useState, useEffect } from "react";
import axios from "axios";

const key = process.env.REACT_APP_WEATHER_API_KEY;
const Weather = ({ country }) => {
  const [temp, setTemp] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);
  const [windSpeed, setWindspeed] = useState(null);
  const convertKelvToCelcAndRound = (temp) => {
    const kelv = parseInt(temp, 10);
    const cels = kelv - 273.15;
    const x = Math.round(cels);
    let ans = x.toString();
    return ans;
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.name}${key}`,
        { mode: "cors" }
      )
      .then((response) => {
        setTemp(convertKelvToCelcAndRound(response.data.main.temp));
        setWindspeed(<p>wind {response.data.wind.speed} m/s</p>);
        setWeatherImage(
          <img
            style={{ width: "8%", height:"auto" }}
            src={`https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`}
            alt={"todays_weather"}
          ></img>
        );
      });
  }, [country.name]);
  return (
    <div>
      <p>Weather Data</p>
      <p>temperature {temp}&deg;C</p>
      {weatherImage}
      {windSpeed}
    </div>
  );
};

export default Weather;
