// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  balance:{type:Number,default:0.0},
  created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
