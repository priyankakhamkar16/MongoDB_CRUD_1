const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  gstNumber: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
