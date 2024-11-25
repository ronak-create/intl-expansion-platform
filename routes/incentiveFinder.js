const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const { findIncentives } = require('../utils/incentiveUtils');

// Route to find incentives
router.post('/find', authenticate, async (req, res) => {
  const { market, businessType } = req.body;

  try {
    const incentives = await findIncentives(market, businessType);
    res.status(200).json({ success: true, incentives });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch incentives" });
  }
});

module.exports = router;
