const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const { calculateRisk, getMitigationStrategies } = require('../utils/riskUtils');

// Route to calculate risk for a market
router.post('/calculate', authenticate, async (req, res) => {
  const { market, businessType } = req.body;

  try {
    const riskData = await calculateRisk(market, businessType);
    res.status(200).json({ success: true, riskData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate risks" });
  }
});

// Route to fetch mitigation strategies
router.get('/strategies/:riskType', authenticate, async (req, res) => {
  const { riskType } = req.params;

  try {
    const strategies = await getMitigationStrategies(riskType);
    res.status(200).json({ success: true, strategies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch mitigation strategies" });
  }
});

module.exports = router;
