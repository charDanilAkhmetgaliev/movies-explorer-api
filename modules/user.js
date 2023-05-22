const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    validator: URL
  },
  password: {
    type: String,
    require: true,
    select: false
  }
});

module.exports = mongoose.model('user', userSchema);