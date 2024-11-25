const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const { getMarketTrends, getSentimentAnalysis } = require('../utils/marketUtils');

// Fetch market trends for a specific region
router.get('/trends', authenticate, async (req, res) => {
  const { country, keywords, date } = req.query;
  console.log(country,keywords,date);
  try {
    const trends = await getMarketTrends(country, keywords, date);
    res.status(200).json({ success: true, trends }) ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch market trends" });
  }
});

// Perform sentiment analysis on market feedback
router.post('/sentiment', authenticate, async (req, res) => {
  const { feedback } = req.body;

  try {
    const sentiment = await getSentimentAnalysis(feedback);
    res.status(200).json({ success: true, sentiment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sentiment analysis failed" });
  }
});

module.exports = router;
