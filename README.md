## VolatiCoin

VolatiCoin is an application that helps users find the most profitable cryptocurrency by analyzing the volatility of various coins over the past 48 hours. It predicts whether the user should buy or sell and displays a chart with the recommendation. The app also calculates potential profits based on shorting or buying.

### Features

- Analyze cryptocurrency volatility over the past 48 hours
- Predict buy or sell recommendations
- Display charts with recommendations
- Calculate potential profits from shorting or buying
- User-friendly UI with an Apple theme

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yashielsookdeo/VolatiCoin.git
    cd VolatiCoin
    ```

2. Install dependencies:
    ```bash
    npm install express axios cors dotenv
    ```

3. Create a `.env` file and add your CoinMarketCap API key:
    ```
    COINMARKETCAP_API_KEY=add_your_key
    PORT=3000
    ```

4. Start the application:
    ```bash
    npm start
    ```

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. View the most volatile cryptocurrencies over the past 48 hours.
3. Follow the buy or sell recommendations.
4. Check the charts and potential profit calculations.

### License

This project is licensed under the MIT License.
