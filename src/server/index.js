const express = require("express");
const cors = require("cors");
const getWeather = require("./weatherTemp");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

const { fetchCityLocation } = require("./getCityLoc");
const { fetchWeatherData } = require("./weatherTemp");
const { fetchCityImage } = require("./getCityPic");
const userText = process.env.USER_PREFIX;
const userNum = process.env.USER_SUFFIX;
const weatherApiKey = process.env.weatherApiKey;
const pixabayApiKey = process.env.pixabayApiKey;
const geoUsername = userText.concat(userNum);

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/getCity", async (req, res) => {
  const cityName = req.body.city;
  const locationData = await fetchCityLocation(cityName, geoUsername);
  return res.send(locationData);
});

app.post("/getWeather", async (req, res) => {
  const { longitude, latitude, daysRemaining } = req.body;
  const weatherData = await fetchWeatherData(longitude, latitude, daysRemaining, weatherApiKey);
  return res.send(weatherData);
});

app.post("/getCityPic", async (req, res) => {
  const { destination } = req.body;
  const cityImageData = await fetchCityImage(destination, process.env.pixabayApiKey);
  return res.send(cityImageData);
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
