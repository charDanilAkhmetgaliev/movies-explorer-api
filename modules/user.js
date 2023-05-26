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
  name, email, password,
}) {
  const hash = await bcrypt.hash(password, PROTECT_CONFIG.BCRYPT_ROUNDS);
  const { _id } = await this.create({ name, email, password: hash });
  return findDocument.call(this, _id);
};

// function update User by ID
userSchema.statics.updateUserDataById = function updateUserDataById(userId, { name, email }) {
  const { currentEmail } = findDocument.call(this, userId);
  return this.findOneAndUpdate(
    { currentEmail },
    { name, email },
    { new: true, runValidators: true },
  );
};

// todo: дописать функцию
userSchema.statics.loginUserByCredentials = async function loginUserByCredentials({
  email, password,
}) {
  try {
    const user = await findDocument.call(this, { email }, { password: true, byObject: true });
    const isOwner = (await bcrypt.compare(password, user.password));
  } catch (error) {
    throw new AuthorizationError(AUTH_ERROR_CONFIG.COMPARE_MESSAGE);
  }
};

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);
