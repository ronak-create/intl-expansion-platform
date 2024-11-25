const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UserDetails = require('../models/UserDetails');

const router = express.Router();

// Setup multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST route to handle user details submission
router.post('/details', upload.single('profileImage'), async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    city,
    country,
    companyName,
    jobTitle
  } = req.body;

  // Access the uploaded profile image
  const profileImage = req.file ? req.file.path : null;

  console.log("Received user details:", req.body);
  console.log("Uploaded profile image:", profileImage);

  // Validate required fields
  if (!fullName || !email || !phone || !address || !city || !country || !companyName || !jobTitle) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create user data object
    const userData = new UserDetails({
      fullName,
      email,
      phone,
      address,
      city,
      country,
      companyName,
      jobTitle,
      profileImage
    });

    // Save the user data to MongoDB
    await userData.save();

    // Send a success response
    res.status(200).json({ message: "User details saved successfully."   });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process user details." });
  }
});

module.exports = router;
