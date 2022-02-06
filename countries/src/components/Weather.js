import React from "react";

function Weather({ capital, data }) {
  const temperature = data.main.temp - 273.15;
  const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg;

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>temperature: {temperature} Celsius</p>
      <img src={icon} alt="weather icon" />
      <p>
        wind: {windSpeed} mph, at {windDirection} degrees
      </p>
    </>
  );
}

export default Weather;
