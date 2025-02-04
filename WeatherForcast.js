import React, { useState, useEffect } from 'react';
import './App.css'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '6521189be722a3773ab838819a3f3b4c'
  ; // Access API key from environment variable
useEffect(() => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setWeatherData(data))
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      setWeatherData(null); // Reset weather data on error
    });
}, [city]);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {weatherData && (
        <div>
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

