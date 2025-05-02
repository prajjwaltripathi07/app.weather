/* eslint-disable no-unused-vars */
// src/App.js
import React, { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import './index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const key = 'a264e39f13414497a8e31223250205'; // Replace with your actual WeatherAPI key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Weather App</h1>

        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Weather
          </button>
        </form>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {weather && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-4 p-4 bg-indigo-100 rounded-lg text-center"
          >
            <h2 className="text-xl font-semibold text-indigo-700">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-lg text-gray-700">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="mx-auto my-2"
            />
            <div className="space-y-1 text-gray-800">
              <p>🌡️ Temperature: <span className="font-semibold">{weather.current.temp_c}°C</span></p>
              <p>💧 Humidity: <span className="font-semibold">{weather.current.humidity}%</span></p>
              <p>💨 Wind: <span className="font-semibold">{weather.current.wind_kph} kph</span></p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
