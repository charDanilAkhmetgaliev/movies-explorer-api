// create main route
const router = require('express').Router();
// import dependencies
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { errorHandler } = require('../scripts/utils/error');
const ObjectNotFoundError = require('../scripts/components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../config');
const { createUser, loginUser, logoutUser } = require('../controllers/users');

// handlers auth routes
router.post('/sign-in', loginUser);
router.post('/sign-up', createUser);

// todo: удалить временную авторизацию
router.use((req, res, next) => {
  req.user = { _id: '646f6d6a2982772e641b5850' };
  next();
});

// handler logout route
router.get('/sign-out', logoutUser);

// connect main routers
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// not found router handler
router.use((
  req,
  res,
  next,
) => next(new ObjectNotFoundError(OBJECT_ERROR_CONFIG.PAGE_NOT_FOUND_MESSAGE)));

// connect all errors handler
router.use((error, req, res, next) => errorHandler(error, res, next));

// export main router
module.exports = router;
