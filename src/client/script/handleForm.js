import axios from "axios";

const travelDataForm = document.querySelector("form");
const locationInput = document.getElementById("destination");
const dateInput = document.getElementById("departureDate");
const BASE_URL = window.location.origin;
const locationErrorMsg = document.getElementById("destination_error");
const dateErrorMsg = document.getElementById("departure_error");

const validateInputs = () => {
  resetErrors();
  
  if (!locationInput.value) {
    showError(locationErrorMsg, "Destination is required");
    return false;
  }

  if (!dateInput.value) {
    showError(dateErrorMsg, "Please enter a departure date");
    return false;
  }

  if (getDaysRemaining(dateInput.value) < 0) {
    showError(dateErrorMsg, "Departure date cannot be in the past");
    return false;
  }

  return true;
};

const resetErrors = () => {
  locationErrorMsg.style.display = "none";
  dateErrorMsg.style.display = "none";
};

const showError = (element, message) => {
  element.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${message}`;
  element.style.display = "block";
};

const getDaysRemaining = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate.getTime() - currentDate.getTime();
  return Math.ceil(diffTime / (1000 * 3600 * 24));
};

const getLocationData = async () => {
  const location = locationInput.value;
  if (location) {
    try {
      const response = await axios.post(`${BASE_URL}/fetchLocation`, { location }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return { error: true, message: "Error retrieving location data." };
    }
  }
  showError(locationErrorMsg, "Destination cannot be empty");
  return { error: true };
};

const fetchWeather = async (lng, lat, remainingDays) => {
  try {
    const response = await axios.post(`${BASE_URL}/fetchWeather`, { lng, lat, remainingDays });
    return response.data;
  } catch (error) {
    return { error: true, message: "Error retrieving weather information." };
  }
};

const getCityImage = async (cityName) => {
  try {
    const response = await axios.post(`${BASE_URL}/fetchImage`, { city_name: cityName });
    return response.data.image;
  } catch (error) {
    return null;
  }
};

const updateUI = (remainingDays, location, image, weather) => {
  document.getElementById("remaining_days").textContent = `Trip starts in ${remainingDays} days`;
  document.querySelector(".locationName").textContent = `Destination: ${location}`;
  document.querySelector(".weatherStatus").textContent =
    remainingDays > 7 ? `Expected weather: ${weather.description}` : `Current weather: ${weather.description}`;

  document.querySelector(".temperature").textContent =
    remainingDays > 7 ? `Expected Temp: ${weather.temp}°C` : `Current Temp: ${weather.temp}°C`;

  document.querySelector(".high-temp").textContent = remainingDays > 7 ? `Max Temp: ${weather.app_max_temp}°C` : "";
  document.querySelector(".low-temp").textContent = remainingDays > 7 ? `Min Temp: ${weather.app_min_temp}°C` : "";

  document.querySelector(".destinationImage").innerHTML = image
    ? `<img src="${image}" alt="View of ${location}">`
    : "<p>Image not available.</p>";

  document.querySelector(".travelInfo").style.display = "block";
};

const handleSubmission = async (event) => {
  event.preventDefault();

  if (!validateInputs()) return;

  try {
    const locationData = await getLocationData();

    if (locationData.error) {
      showError(locationErrorMsg, locationData.message);
      return;
    }

    const { longitude, latitude, cityName } = locationData;
    const travelDate = dateInput.value;

    if (!travelDate) {
      showError(dateErrorMsg, "Departure date is required");
      return;
    }

    const daysRemaining = getDaysRemaining(travelDate);
    const weatherData = await fetchWeather(longitude, latitude, daysRemaining);

    if (weatherData.error) {
      showError(dateErrorMsg, weatherData.message);
      return;
    }

    const cityPicture = await getCityImage(cityName);
    updateUI(daysRemaining, cityName, cityPicture, weatherData);
  } catch (error) {
    showError(locationErrorMsg, "Unexpected error occurred. Try again later.");
  }
};



travelDataForm.addEventListener("submit", handleSubmission);
export default { handleSubmission };

