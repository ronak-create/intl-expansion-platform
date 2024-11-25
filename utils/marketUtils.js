const axios = require('axios');
const googleTrends = require('google-trends-api');
const sentiment = require('sentiment'); // Sentiment analysis library

// Mock function to fetch market trends (replace with real API/data integration)
const getMarketTrends = async (region, keywords, date) => {
  try {
    const trendsData = await new Promise((resolve, reject) => {
      // Fetch interest over time for multiple keywords
      googleTrends.interestOverTime({
        keyword: keywords, // Array of keywords you're interested in (e.g., stock tickers, market-related terms)
        geo: region || "IN", // The region code (e.g., 'US', 'IN')
        startTime: new Date (date) || new Date('2024-01-01'), // Set an appropriate start time
      }, (err, results) => {
        if (err) {
          reject(err); // Reject promise if there's an error
        } else {
          resolve(results); // Resolve with the API response
        }
      });
    });

    // Parse the trends data
    const parsedData = JSON.parse(trendsData);

    // If data is available, extract the relevant market trends
    if (parsedData.default && parsedData.default.timelineData) {
      const trends = parsedData.default.timelineData.map((data) => ({
        date: data.formattedTime,
        value: data.value, // The trend value for the corresponding date
      }));

      return trends;
    } else {
      console.log('No market trends data available for the given keywords.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching market trends:', error);
    return [];
  }
};


// Perform sentiment analysis
const getSentimentAnalysis = (feedback) => {
  const analysis = new sentiment();
  return analysis.analyze(feedback);
};

module.exports = { getMarketTrends, getSentimentAnalysis };
