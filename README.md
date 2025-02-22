# Travel App Planner

## Overview

Travel App Planner is a web application designed to help users explore and plan their trips. It provides a seamless, interactive experience with various features to enhance the trip planning process.

## Features

- **Search for cities**: View location data for any city.
- **Weather information**: Display current and forecasted weather for the selected city.
- **City images**: Show relevant images of the city to inspire your trip.
- **Trip countdown**: Calculate the remaining days until your trip starts.

## Dependencies

The application relies on the following dependencies:

### Frontend:
- `axios`: For making HTTP requests to APIs.
- `bootstrap`: For styling and responsive design.
- `webpack`: For module bundling.
- `html-webpack-plugin`: For generating HTML files.
- `mini-css-extract-plugin`: For extracting CSS into separate files.
- `css-minimizer-webpack-plugin`: For optimizing CSS.
- `terser-webpack-plugin`: For JavaScript optimization.
- `webpack-merge`: For merging webpack configurations.

### Backend (if applicable):
- `express`: For setting up the server.
- `cors`: For handling cross-origin requests.
- `dotenv`: For managing environment variables.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
      git clone https://github.com/mohammadSweiti/Travel-App-Udacity.git
   
2. **Navigate to the project directory**:

   cd Travel-App-Udacity
   

3. **Install dependencies**:
   
   npm install
   

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add your API keys:
   
   GEONAMES_USERNAME=your_geonames_username
   WEATHERBIT_API_KEY=your_weatherbit_api_key
   PIXABAY_API_KEY=your_pixabay_api_key
   

5. **Start the development server**:
   
   npm start
   

6. **Build the project for production**:
   
   npm run build
   

7. **Run tests** (if applicable):
   
   npm test
   

## API Usage

This application uses the following APIs to fetch data:

- **Geonames API**: Retrieves city location data (latitude, longitude, country, etc.).
- **Weatherbit API**: Fetches current and forecasted weather information.
- **Pixabay API**: Provides high-quality images for the selected city.

Make sure to sign up for these APIs and obtain your API keys. Add them to the `.env` file as shown above.

## Project Structure


Travel-App-Udacity/
│── src/
│   ├── client/            # Frontend code (HTML, CSS, JavaScript)
│   ├── server/            # Backend code 
│── webpack.common.js      # Shared webpack configuration
│── webpack.dev.js         # Development-specific webpack configuration
│── webpack.prod.js        # Production-specific webpack configuration
│── package.json           # Project dependencies and scripts
│── README.md              # Project documentation
│── .env                   # Environment variables (not committed to version control)
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact:

- **Mohammad Sweiti**
- GitHub: [mohammadSweiti](https://github.com/mohammadSweiti)

