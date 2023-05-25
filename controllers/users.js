// import dependencies
const User = require('../modules/user');
const { errorsHandleWrapper } = require('../scripts/utils/controller');
const { USERS_CONTROL_CONFIG } = require('../config');
const { findDocument } = require('../scripts/utils/model');

module.exports.getUserData = (req, res, next) => errorsHandleWrapper(
  () => findDocument.call(User, req.user._id, next),
  res,
  next,
);

module.exports.updateUserData = (req, res, next) => errorsHandleWrapper(
  () => User.updateUserDataById(req.user._id, req.body, next),
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_UPDATE_MESSAGE,
);

module.exports.createUser = (req, res, next) => errorsHandleWrapper(
  () => User.createUserByCredentials(req.body),
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_SIGNUP_MESSAGE,
);

module.exports.loginUser = (req, res, next) => errorsHandleWrapper(
  () => User.loginUserByCredentials(req.body, next),
  res,
  next,
);
