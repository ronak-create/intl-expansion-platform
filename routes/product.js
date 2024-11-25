const express = require('express');
const multer = require('multer');
const Product = require('../models/ProductDetails');  // Import the Product model

const router = express.Router();

// Setup multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST route to handle product details submission
router.post('/details', upload.single('productImage'), async (req, res) => {
  const {
    productName,
    productCategory,
    productDescription,
    productPrice,
    productQuantity,
    productOrigin,
    country,
    targetMarket
  } = req.body;

  // Access the uploaded product image (if any)
  const productImage = req.file ? req.file.path : null;

  // Log received product details and uploaded image (for debugging purposes)
  console.log("Received product details:", req.body);
  console.log("Uploaded product image:", productImage);

  // Validate required fields
  if (!productName || !productCategory || !productDescription || !productPrice || !productQuantity || !productOrigin || !country || !targetMarket) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create product data object
    const productData = new Product({
      productName,
      productCategory,
      productDescription,
      productPrice,
      productQuantity,
      productOrigin,
      country,
      targetMarket,
      productImage
    });

    // Save the product data to MongoDB
    await productData.save();

    // Send a success response
    res.status(200).json({ message: "Product details saved successfully." });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process product details." });
  }
});

module.exports = router;
