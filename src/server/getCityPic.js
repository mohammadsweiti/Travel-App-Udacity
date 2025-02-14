const axios = require("axios");

const fetchCityImage = async (cityName, apiKey) => {
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo`;
    const response = await axios.get(apiUrl);
    const { data } = response;

    const cityImage = data.hits[0] 
        ? data.hits[0].webformatURL 
        : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";

    return { cityImage };
};

module.exports = { fetchCityImage };
