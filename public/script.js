document.addEventListener("DOMContentLoaded", async function () {
    // Define the API endpoint to fetch volatile coins data
    const API_URL = "/volatile-coins";
    // Get references to the table body and reasoning text elements in the DOM
    const tableBody = document.getElementById("crypto-table");
    const reasoningText = document.getElementById("reasoning");
    // Get the context for the chart
    const ctx = document.getElementById("volatilityChart").getContext("2d");
    
    // Variable to hold the chart instance
    let chartInstance = null;

    // Function to fetch crypto data from the API
    async function fetchCryptoData() {
        try {
            // Make a request to the API and parse the JSON response
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error("Error fetching crypto data:", error);
            return [];
        }
    }

    // Function to get reasoning based on the volatility value
    function getReasoning(volatility) {
        if (volatility > 10) {
            return "Extreme volatility! High trading volume and speculative interest.";
        } else if (volatility > 5) {
            return "Moderate volatility. Market is reacting to news or trends.";
        } else {
            return "Stable market. Lower risk of price swings.";
        }
    }

    // Function to update the chart with the selected crypto's volatility data
    function updateChart(crypto) {
        // Destroy the existing chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create a new chart instance with the crypto's volatility data
        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [crypto.name],
                datasets: [{
                    label: "Volatility (%)",
                    data: [crypto.volatility],
                    backgroundColor: crypto.volatility > 10 ? "red" : "blue"
                }]
            }
        });

        // Update the reasoning text based on the crypto's volatility
        reasoningText.textContent = getReasoning(crypto.volatility);
    }

    // Function to populate the table with the fetched crypto data
    function populateTable(data) {
        // Clear the existing table content
        tableBody.innerHTML = "";
        // Iterate over each crypto item and create a table row
        data.forEach(crypto => {
            const row = document.createElement("tr");

            // Set the inner HTML of the row with the crypto's data
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>$${crypto.price.toFixed(2)}</td>
                <td>${crypto.volatility.toFixed(2)}%</td>
                <td><button onclick='updateChart(${JSON.stringify(crypto)})'>Analyze</button></td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    }

    // Fetch the crypto data and populate the table on page load
    const cryptoData = await fetchCryptoData();
    populateTable(cryptoData);
});
