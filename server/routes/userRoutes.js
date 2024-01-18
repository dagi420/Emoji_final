// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Create this file later

// Registration
router.post('/register', async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      // Check if the phone number is already registered
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({ error: 'Phone number is already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ phoneNumber, password: hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' , details: error.message});
    }
  });
  
  module.exports = router;

// Login
router.post('/login', async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      // Find the user by phone number
      const user = await User.findOne({ phoneNumber });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid phone number or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // Check if the passwords match
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid phone number or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, '39D965D8753418A95C8AD501F25E822E387B74CAAEFD39CD6B8055846FACF744', { expiresIn: '1h' });
  
      // Send the token as a response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // update score
  
  router.post('/update-score', async (req, res) => {
    const { phoneNumber, score } = req.body;
  
    try {
      const user = await User.findOne({ phoneNumber });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.score = score;
      await user.save();
  
      res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
      console.error('Error updating score:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;