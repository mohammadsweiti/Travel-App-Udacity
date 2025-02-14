const axios = require("axios");

const fetchCityLocation = async (cityName, user) => {
    const apiUrl = `https://secure.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${user}`;
    const response = await axios.get(apiUrl);
    const { data } = response;

    if (data.geonames.length === 0) {
        return {
            hasError: true,
            errorMessage: "No city found with that name. Please check your spelling."
        };
    }

    return data.geonames[0];
};

module.exports = { fetchCityLocation };
