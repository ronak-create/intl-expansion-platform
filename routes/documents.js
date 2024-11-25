const express = require('express');
const { authenticate } = require('../middleware/auth');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Generate a document based on user input
router.post('/generate', authenticate, async (req, res) => {
  const { productName, productType, country, attributes } = req.body;
  console.log(productName, productType, country, attributes);
  if (!productName || !productType || !country || !attributes) {
    return res.status(400).json({ error: "All fields are required: productName, productType, country, and attributes." });
  }

  try {
    // Use the provided product data directly
    const demoData = [
      { productName: 'Vans Old Skool Sneakers', productType: 'Footwear', country: 'USA', size: '8', price: '60.00', stock: 100, rating: '4.3' },
      { productName: 'Skechers Go Walk Shoes', productType: 'Footwear', country: 'USA', size: '9', price: '55.00', stock: 180, rating: '4.4' },
      { productName: 'New Balance 990v5', productType: 'Footwear', country: 'USA', size: '10', price: '175.00', stock: 80, rating: '4.5' },
      { productName: 'Reebok Classic Leather', productType: 'Footwear', country: 'USA', size: '11', price: '75.00', stock: 200, rating: '4.3' },
      { productName: 'Asics Gel-Kayano', productType: 'Footwear', country: 'Japan', size: '9', price: '130.00', stock: 50, rating: '4.4' },
      { productName: 'Converse Chuck Taylor', productType: 'Footwear', country: 'USA', size: '8', price: '55.00', stock: 150, rating: '4.5' },
      { productName: 'Under Armour Curry One', productType: 'Footwear', country: 'USA', size: '10', price: '120.00', stock: 70, rating: '4.6' },
      { productName: 'Dr. Martens 1460 Boots', productType: 'Footwear', country: 'UK', size: '8', price: '150.00', stock: 40, rating: '4.5' },
      { productName: 'Reebok Nano X2', productType: 'Footwear', country: 'USA', size: '11', price: '130.00', stock: 100, rating: '4.6' },
      { productName: 'Fila Disruptor 2', productType: 'Footwear', country: 'Italy', size: '9', price: '65.00', stock: 300, rating: '4.4' },
      { productName: 'Timberland Pro Boots', productType: 'Footwear', country: 'USA', size: '10', price: '160.00', stock: 90, rating: '4.7' }
    ];

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(demoData);

    // Path to save the CSV file (in your personal folder)
    const filePath = path.join(__dirname, 'generated', 'demo_products.csv');

    // Write the CSV to a file
    fs.writeFileSync(filePath, csv);

    // Send the CSV file as a downloadable response
    res.download(filePath, 'demo_products.csv', (err) => {
      if (err) {
        res.status(500).send({ error: 'Failed to download file.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate document." });
  }
});

module.exports = router;
