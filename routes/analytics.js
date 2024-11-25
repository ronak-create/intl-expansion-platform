const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Mock data for analytics
const analyticsData = {
  trends: [
    { market: "USA", growthRate: 5.2 },
    { market: "Germany", growthRate: 3.8 },
    { market: "India", growthRate: 6.7 },
  ],
  risks: [
    { market: "USA", riskLevel: "Medium" },
    { market: "Germany", riskLevel: "Low" },
    { market: "India", riskLevel: "High" },
  ],
};

// Route to fetch analytics data
router.get('/data', authenticate, (req, res) => {
  res.status(200).json({ success: true, analytics: analyticsData });
});

module.exports = router;
