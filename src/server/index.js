const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("dist"));

require("dotenv").config();

const { fetchCityLocation } = require("./getCityLoc");
const { fetchWeatherData } = require("./weatherTemp");
const { fetchCityImage } = require("./getCityPic");


server.use(cors());

const PORT = 8000;

const userText = process.env.USER_PREFIX;
const userNum = process.env.USER_SUFFIX;
const weatherApiKey = process.env.weatherApiKey;
const pixabayApiKey = process.env.pixabayApiKey
const geoUsername = userText.concat(userNum);

server.get("/", (req, res) => {
  res.render("index.html");
});

server.post("/getCity", async (req, res) => {
  const cityName = req.body.city;
  const locationData = await fetchCityLocation(cityName, geoUsername);
  return res.send(locationData);
});

server.post("/getWeather", async (req, res) => {
  const { longitude, latitude, daysRemaining } = req.body;
  const weatherData = await fetchWeatherData(longitude, latitude, daysRemaining, weatherApiKey);
  return res.send(weatherData);
});

server.post("/getCityPic", async (req, res) => {
  const { destination } = req.body;
  const cityImageData = await fetchCityImage(destination, pixabayApiKey);
  return res.send(cityImageData);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
