const mongoose = require('mongoose');

// Define the schema for product details
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  productOrigin: { type: String, required: true },
  country: { type: String, required: true },
  targetMarket: { type: String, required: true },
  productImage: { type: String, required: false },  // URL or path to the uploaded image
});

// Create the model
const ProductDetails = mongoose.model('Product', productSchema);

module.exports = ProductDetails;
