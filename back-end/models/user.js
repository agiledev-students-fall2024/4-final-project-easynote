const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');  

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String, //put hashed password here
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  occupation: {
    type: String, 
    required: false
  },
  studying: {
    type: String, 
    required: false
  },
  name: {
    firstName: {
      type: String,
      required: false,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      trim: true
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;