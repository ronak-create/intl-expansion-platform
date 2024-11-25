const mongoose = require('mongoose');

// Define the schema for the user details
const userDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  profileImage: { type: String, required: false }  // URL or path to the uploaded image
});

// Create the model
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;
