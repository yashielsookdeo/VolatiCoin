require('dotenv').config(); // Load environment variables from a .env file into process.env
const express = require('express'); // Import the Express framework
const axios = require('axios'); // Import Axios for making HTTP requests
const cors = require('cors'); // Import CORS to allow cross-origin requests
const path = require('path'); // Import the path module for working with file and directory paths

const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3000; // Define the port the server will listen on, default to 3000 if not specified in environment variables
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY; // Get the CoinMarketCap API key from environment variables
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'; // Define the base URL for the CoinMarketCap API

app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Function to fetch cryptocurrency data from CoinMarketCap API
async function fetchCryptoData() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { 'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY } // Set the API key in the request headers
        });

        console.log("API Response Data Sample:", response.data.data[0].quote.USD); // Log a sample of the API response data for debugging
        return response.data.data; // Return the data from the API response
    } catch (error) {
        console.error('Error fetching crypto data:', error.message); // Log an error message if the request fails
        return []; // Return an empty array if there is an error
    }
}

// Function to calculate the volatility of each cryptocurrency
function calculateVolatility(data) {
    return data.map(coin => {
        const { quote } = coin; // Destructure the quote property from the coin object
        const usdData = quote.USD; // Get the USD data from the quote

        // Ensure data exists before accessing properties
        if (!usdData || usdData.percent_change_24h === undefined) {
            return { name: coin.name, symbol: coin.symbol, price: usdData?.price || 0, volatility: null }; // Return null volatility if data is missing
        }

        // Use absolute percentage change in the last 24 hours as volatility
        const volatility = Math.abs(usdData.percent_change_24h); // Calculate volatility as the absolute value of the 24-hour percentage change

        return { name: coin.name, symbol: coin.symbol, price: usdData.price, volatility }; // Return the coin's name, symbol, price, and calculated volatility
    }).sort((a, b) => b.volatility - a.volatility); // Sort the coins by volatility in descending order
}

// Route to get the top 10 most volatile cryptocurrencies
app.get('/volatile-coins', async (req, res) => {
    const data = await fetchCryptoData(); // Fetch the cryptocurrency data
    const volatileCoins = calculateVolatility(data); // Calculate the volatility of each coin
    res.json(volatileCoins.slice(0, 10)); // Return the top 10 most volatile coins as a JSON response
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // Log a message when the server starts
