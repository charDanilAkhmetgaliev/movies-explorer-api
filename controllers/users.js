// import dependencies
const jwt = require('jsonwebtoken');
const User = require('../modules/user');
const { errorsHandleWrapper } = require('../scripts/utils/controller');
const { USERS_CONTROL_CONFIG, TOKEN_CONFIG, COOKIE_CONFIG } = require('../config');
const { findDocument } = require('../scripts/utils/model');

module.exports.getUserData = (req, res, next) => errorsHandleWrapper(
  () => findDocument.call(User, req.user._id),
  res,
  next,
);

module.exports.updateUserData = (req, res, next) => errorsHandleWrapper(
  () => User.updateUserDataById(req.user._id, req.body),
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
  () => {
    const user = User.loginUserByCredentials(req.body);
    const token = jwt.sign(
      { _id: user._id },
      TOKEN_CONFIG.SECRET_KEY,
      { expiresIn: TOKEN_CONFIG.EXPIRES },
    );
    res.cookie(COOKIE_CONFIG.NAME, token, { maxAge: COOKIE_CONFIG.MAX_AGE, httpOnly: true });
    return user;
  },
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_LOGIN_MESSAGE,
);

module.exports.logoutUser = (req, res, next) => errorsHandleWrapper(
  () => res.cookie(COOKIE_CONFIG.NAME, '', { expires: COOKIE_CONFIG.EXPIRES_LOGOUT, httpOnly: true }),
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_LOGOUT_MESSAGE,
);
