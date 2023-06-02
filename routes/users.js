// create user router
const usersRouter = require('express').Router();
// import controllers
const { getUserData, updateUserData } = require('../controllers/users');
const { updateUserScheme } = require('../scripts/utils/clb');

// handler get user data route
usersRouter.get('/me', getUserData);

// handler update user data route
usersRouter.patch('/me', updateUserScheme, updateUserData);

// export user router
module.exports = usersRouter;
