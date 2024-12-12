const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'test_jwt_secret'; 

router.post('/', async (req, res) => {
  const { name, email, password, occupation, studying } = req.body;
  let username = name;

  console.log("DBG: user registration: ");
  console.log(req.body);

  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields: username, email, and password are required.'
    });
  }

  // Check if username or email already exists
  try {
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByEmail) {
      return res.status(400).send('Email is already in use.');
    }

    if (existingUserByUsername) {
      return res.status(400).send('Username is already taken.');
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).send('Error hashing password');
      }

      console.log(username);
      // Create the new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        occupation,
        studying,
      });

      try {
        await user.save();
        console.log("register succeed!");
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: '24h' } 
        );

        res.status(201).send({
          message: 'User registered successfully',
          token, 
          username: user.username,  
          email:user.email,  
          occupation: user.occupation,  
          studying: user.studying
        });
      } catch (err) {
        res.status(500).send(`Error saving user to database: ${err.message}`);
      }
    });
  } catch (err) {
    return res.status(500).send(`Error checking for existing user: ${err.message}`);
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const hashedPassword = password;  //TODO
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: hashedPassword !== undefined ? hashedPassword : undefined,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
