const express = require('express');
const router = express.Router();

// Placeholder compliance endpoint
router.get('/', (req, res) => {
  res.json({ message: "Insights API working!" });
});

module.exports = router;
