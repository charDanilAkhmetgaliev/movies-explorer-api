// import dependencies
const jwt = require('jsonwebtoken');
const User = require('../modules/user');
const { responseSandler } = require('../scripts/utils/controller');
const { USERS_CONTROL_CONFIG, TOKEN_CONFIG, COOKIE_CONFIG } = require('../config');
const { searchDocsInDb } = require('../scripts/utils/model');

// get user data GET-route /users/me controller
module.exports.getUserData = (req, res, next) => responseSandler(
  () => searchDocsInDb.call(User, req.user._id),
  res,
  next,
);

// update user data PATCH-route /users/me controller
module.exports.updateUserData = (req, res, next) => responseSandler(
  () => User.updateUserDataById(req.user._id, req.body),
  res,
  next,
  // USERS_CONTROL_CONFIG.SUCCESS_UPDATE_MESSAGE,
);

// login user POST-route /sign-up controller
module.exports.createUser = (req, res, next) => responseSandler(
  () => User.createUserByCredentials(req.body),
  res,
  next,
  // USERS_CONTROL_CONFIG.SUCCESS_SIGNUP_MESSAGE,
);

// login user POST-route /sign-in controller
module.exports.loginUser = (req, res, next) => responseSandler(
  () => {
    const user = User.findUserByCredentials(req.body);
    const token = jwt.sign(
      { _id: user._id },
      TOKEN_CONFIG.SECRET_JWT,
      { expiresIn: TOKEN_CONFIG.EXPIRES },
    );
    res.cookie('jwt', token, { maxAge: COOKIE_CONFIG.MAX_AGE, httpOnly: true });
    return user;
  },
  res,
  next,
  // USERS_CONTROL_CONFIG.SUCCESS_LOGIN_MESSAGE,
);

// logout user GET-route /sign-out controller
module.exports.logoutUser = (req, res, next) => responseSandler(
  () => res.cookie('jwt', '', { expires: COOKIE_CONFIG.EXPIRES_DATE, httpOnly: true }),
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_LOGOUT_MESSAGE,
);
