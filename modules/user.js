// import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../scripts/components/AuthorizationError');
const { AUTH_ERROR_CONFIG, PROTECT_CONFIG } = require('../config');
const { findDocument } = require('../scripts/utils/model');

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
}, { versionKey: false });

// function create user by credentials
userSchema.statics.createUserByCredentials = async function createUserByCredentials({
  name, email, password, next,
}) {
  const hash = await bcrypt.hash(password, PROTECT_CONFIG.BCRYPT_ROUNDS);
  const { _id } = await this.create({ name, email, password: hash });
  return findDocument.call(this, _id, next);
};

// function update User by ID
userSchema.statics.updateUserDataById = function updateUserDataById(userId, { name, email }, next) {
  const { currentEmail } = findDocument.call(this, userId, next);
  return this.findOneAndUpdate(
    { currentEmail },
    { name, email },
    { new: true, runValidators: true },
  );
};

// todo: дописать функцию
userSchema.statics.loginUserByCredentials = async function loginUserByCredentials({
  email, password,
}, next) {
  try {
    const user = await findDocument.call(this, { email }, next, { password: true, byObject: true });
    const isOwner = (await bcrypt.compare(password, user.password));
  } catch (error) {
    throw new AuthorizationError(AUTH_ERROR_CONFIG.COMPARE_MESSAGE);
  }
};

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);
