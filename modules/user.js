const mongoose = require('mongoose');

// create user schema
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

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);