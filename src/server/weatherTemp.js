const axios = require('axios');
require('dotenv').config();

const getWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = getWeather;
