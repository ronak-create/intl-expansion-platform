const express = require('express');
const UserDetails = require('../models/UserDetails');
const Product = require('../models/ProductDetails'); 
const router = express.Router();

// Placeholder compliance endpoint
router.get('/market-details', (req, res) => {
  res.json({ message: "Target Company Market API working!" });
});


router.get('/recent-user', async (req, res) => {
    try {   
      const user = await UserDetails.find().sort({ createdAt: -1 }).limit(1); // Sort by creation date, descending
      if (!user || user.length === 0) {
          return res.status(404).json({ message: 'No users found' });
      }
      res.json(user[0]);  // Return the most recent user
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user data', error: err });
    }
  });
  
router.get('/recent-product', async (req, res) => {
      try {
          const product = await Product.find().sort({ createdAt: -1 }).limit(1); // Sort by creation date, descending
      if (!product || product.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
      res.json(product[0]);  // Return the most recent product
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product data', error: err });
    }
});

module.exports = router;