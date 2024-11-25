const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const axios = require('axios');
const router = express.Router();

// Mock API endpoint for regulatory data (replace with actual API endpoint)
const API_URL = 'https://api.example.com/regulations';

// Fetch regulations by country and industry
router.get('/:country/:industry', authenticate, async (req, res) => {
  const { country, industry } = req.params;

  try {
    const response = await axios.get(`${API_URL}?country=${country}&industry=${industry}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch regulations" });
  }
});

module.exports = router;
