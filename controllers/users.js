// import dependencies
const User = require('../modules/user');

// GET user data route controller
module.exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.user);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// PATCH user data route controller
module.exports.updateUserData = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findUserById(req.user);
    const userUpdated = await User.findOneAndUpdate(user, { name, email }, {
      new: true,
      runValidators: true,
    });
    res.send(userUpdated);
  } catch (error) {
    next(error);
  }
};
