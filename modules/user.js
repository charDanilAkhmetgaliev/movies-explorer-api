// import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../scripts/components/AuthorizationError');
const { AUTH_ERROR_CONFIG, PROTECT_CONFIG } = require('../config');
const { searchDocsInDb } = require('../scripts/utils/model');

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
  return searchDocsInDb.call(this, _id);
};

// function update User by ID
userSchema.statics.updateUserDataById = async function updateUserDataById(userId, { name, email }) {
  const { currentEmail } = await searchDocsInDb.call(this, userId);
  return this.findOneAndUpdate(
    { currentEmail },
    { name, email },
    { new: true, runValidators: true },
  );
};

// function login user by credentials
userSchema.statics.findUserByCredentials = async function findUserByCredentials({
  email, password,
}) {
  const user = await searchDocsInDb.call(this, { email }, { selectProps: ['+password'] });
  const isOwner = (await bcrypt.compare(password, user.password));
  if (isOwner) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }
  throw new AuthorizationError(AUTH_ERROR_CONFIG.COMPARE_MESSAGE);
};

// export user schema as mongoose model
module.exports = mongoose.model('user', userSchema);
