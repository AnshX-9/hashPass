
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body; 
   
    const salt = await bcrypt.genSalt(10); 
    
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
