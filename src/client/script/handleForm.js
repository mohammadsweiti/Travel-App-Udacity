import axios from "axios";

const travelForm = document.querySelector("form");
const destinationInput = document.getElementById("city");
const departureDateInput = document.getElementById("flightDate");
const SERVER_BASE = window.location.origin;
const destinationError = document.getElementById("city_error");
const dateValidationError = document.getElementById("date_error");

const handleFormSubmission = async (event) => {
  event.preventDefault();

  console.log("Form submission initiated");

  if (!validateFormInputs()) {
    return;
  }

  try {
    const locationInfo = await fetchCityLocation();

    if (locationInfo && locationInfo.error) {
      displayError(destinationError, locationInfo.message);
      return;
    }

    if (locationInfo && !locationInfo.error) {
      const { longitude, latitude, cityName } = locationInfo;
      const travelDate = departureDateInput.value;

      if (!travelDate) {
        console.log("Travel date is required");
        displayError(dateValidationError, "Please provide the travel date");
        return;
      }

      const daysUntilDeparture = calculateDaysRemaining(travelDate);

      const weatherForecast = await retrieveWeatherInfo(longitude, latitude, daysUntilDeparture);

      if (weatherForecast && weatherForecast.error) {
        displayError(dateValidationError, weatherForecast.message);
        return;
      }

      const cityImage = await fetchCityImage(cityName);
      updateTravelDetails(daysUntilDeparture, cityName, cityImage, weatherForecast);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    displayError(destinationError, "An unexpected error occurred. Please try again later.");
  }
};

const validateFormInputs = () => {
  hideErrors();

  if (!destinationInput.value) {
    displayError(destinationError, "Destination city is required");
    return false;
  }

  if (!departureDateInput.value) {
    displayError(dateValidationError, "Departure date is required");
    return false;
  }

  if (calculateDaysRemaining(departureDateInput.value) < 0) {
    displayError(dateValidationError, "Departure date cannot be in the past");
    return false;
  }

  return true;
};

const hideErrors = () => {
  destinationError.style.display = "none";
  dateValidationError.style.display = "none";
};

const displayError = (element, message) => {
  element.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${message}`;
  element.style.display = "block";
};

const fetchCityLocation = async () => {
  const city = destinationInput.value;
  if (city) {
    try {
      const response = await axios.post(`${SERVER_BASE}/getCity`, { city }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching city location:", error);
      return { error: true, message: "Error fetching city location." };
    }
  } else {
    displayError(destinationError, "Destination cannot be empty");
    return { error: true };
  }
};

const retrieveWeatherInfo = async (lng, lat, remainingDays) => {
  try {
    const response = await axios.post(`${SERVER_BASE}/getWeather`, {
      lng,
      lat,
      remainingDays,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: true, message: "Error fetching weather data." };
  }
};

const calculateDaysRemaining = (date) => {
  const today = new Date();
  const endDate = new Date(date);
  const timeDifference = endDate.getTime() - today.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return dayDifference;
};

const fetchCityImage = async (cityName) => {
  try {
    const response = await axios.post(`${SERVER_BASE}/getCityPic`, {
      city_name: cityName,
    });
    const { image } = response.data;
    return image;
  } catch (error) {
    console.error("Error fetching city image:", error);
    return null;
  }
};

const updateTravelDetails = (daysRemaining, city, image, weather) => {
  document.getElementById("Rdays").textContent = `Your trip starts in ${daysRemaining} days from now`;
  document.querySelector(".cityName").textContent = `Location: ${city}`;
  document.querySelector(".weather").textContent =
    daysRemaining > 7
      ? `Weather forecast: ${weather.description}`
      : `Current weather: ${weather.description}`;

  document.querySelector(".temp").textContent =
    daysRemaining > 7
      ? `Forecasted temperature: ${weather.temp}&degC`
      : `Current temperature: ${weather.temp} &degC`;

  document.querySelector(".max-temp").textContent = daysRemaining > 7 ? `Max Temp: ${weather.app_max_temp}&degC` : "";
  document.querySelector(".min-temp").textContent = daysRemaining > 7 ? `Min Temp: ${weather.app_min_temp}&degC` : "";

  if (image) {
    document.querySelector(".cityPic").innerHTML = `<img src="${image}" alt="Image of ${city}">`;
  } else {
    document.querySelector(".cityPic").innerHTML = "<p>Could not retrieve image.</p>";
  }
  document.querySelector(".flight_data").style.display = "block";
};

// Attach the handleFormSubmission function to the form's submit event
travelForm.addEventListener("submit", handleFormSubmission);

export default { handleFormSubmission };