const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Invalid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [5, 'Password should have at least 8 symbols'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
