// create user router
const usersRouter = require('express').Router();
// import controllers
const { getUserData, updateUserData } = require('../controllers/users');

// handler get user data route
usersRouter.get('/me', getUserData);

// handler update user data route
usersRouter.patch('/me', updateUserData);

// export user router
module.exports = usersRouter;
