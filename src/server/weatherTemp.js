const axios = require("axios");

const fetchWeatherData = async (longitude, latitude, forecastDays, apiKey) => {
    if (forecastDays < 0) {
        return {
            message: "Date cannot be in the past",
            error: true
        };
    }

    if (forecastDays > 0 && forecastDays <= 7) {
        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&units=M&key=${apiKey}`);
        console.log("******************************************************");
        const { weather, temp } = data.data[data.data.length - 1];
        const { description } = weather;
        const weatherInfo = { description, temp };
        console.log(weatherInfo);
        console.log("******************************************************");
        return weatherInfo;
        
    } else if (forecastDays > 7) {
        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=M&days=${forecastDays}&key=${apiKey}`);
        console.log("******************************************************");
        const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
        const { description } = weather;
        const forecastInfo = { description, temp, app_max_temp, app_min_temp };
        console.log("******************************************************");
        return forecastInfo;
    }
};

module.exports = {
    fetchWeatherData
};
