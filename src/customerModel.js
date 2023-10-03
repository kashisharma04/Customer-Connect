const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    unique: true,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_image: {
    type: String, // store image URL
  },
  total_orders: {
    type: Number,
    default: 0, 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);


