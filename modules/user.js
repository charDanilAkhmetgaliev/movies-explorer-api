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

// function find user in schema by id
// userSchema.statics.findUserById = async function (userId) {
//   try {
//     return await this.findById(userId);
//   } catch (error) {
//     throw new
//   }
// }

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);