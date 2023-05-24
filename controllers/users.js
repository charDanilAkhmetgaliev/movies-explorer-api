// import dependencies
const User = require('../modules/user');
const { errorsHandleWrapper } = require('../scripts/utils/controller');
const { USERS_CONTROL_CONFIG } = require('../config');

module.exports.getUserData = (req, res, next) => errorsHandleWrapper(
  () => User.findUserById(req.user._id),
  res,
  next,
);

module.exports.updateUserData = (req, res, next) => errorsHandleWrapper(
  () => {
    const user = User.findUserById(req.user._id);
    return User.findOneAndUpdate(user, { name: req.body.name, email: req.body.email }, {
      new: true,
      runValidators: true,
    });
  },
  res,
  next,
  USERS_CONTROL_CONFIG.SUCCESS_UPDATE_MESSAGE,
);
