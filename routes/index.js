// create main route
const router = require('express').Router();
// import dependencies
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { errorHandler } = require('../scripts/utils/error');
const ObjectNotFoundError = require('../scripts/components/ObjectNotFoundError');
const { PAGE_NOT_FOUND_MESSAGE } = require('../config');

// connect routers
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// not found router handler
router.use((req, res, next) => next(new ObjectNotFoundError(PAGE_NOT_FOUND_MESSAGE)));

// connect all errors handler
router.use((error, req, res, next) => errorHandler(error, res, next));

// export main router
module.exports = router;
