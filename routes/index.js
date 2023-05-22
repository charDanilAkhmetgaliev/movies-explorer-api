// import dependencies
const usersRouter = require('./users');
const moviesRouter = require('./movies');

// create main route
const router = require('express').Router();

// connect routers
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// export main router
module.exports = router;