// import dependencies
const mongoose = require('mongoose');
const ObjectNotFoundError = require('../scripts/components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../config');

// create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator: URL,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// function find user in schema by id
userSchema.statics.findUserById = async function findUserById(userId) {
  try {
    return await this.findById(userId);
  } catch (error) {
    throw new ObjectNotFoundError(OBJECT_ERROR_CONFIG.MESSAGE_BY_ID(userId));
  }
};

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);
