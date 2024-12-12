// routes/login.js
const express = require('express');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const USER_SECRET = 'test_jwt_secret'; 

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log("DBG: come into login, generate token, user:",req.body, email, password);
    
    await User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.json({ 'Error': 'User not found'}); 
        }
    
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.json({ 'Error': 'Error comparing passwords'}); 
          }
    
          if (isMatch) {
            const token = jwt.sign({ id: user._id }, USER_SECRET, { expiresIn: '24h' });
            return res.status(200).json({username: user.username,  email:user.email,  occupation: user.occupation,  studying: user.studying, token });        
          } else {
            res.json({ 'Error': 'Invalid passwords'}); 
          }
        });
      })
      .catch(err => res.json({ 'Error': 'Error fetching user from database', 'Details': err.message }));
    
});

module.exports = router;
