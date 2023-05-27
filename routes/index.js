// create main route
const router = require('express').Router();
// import dependencies
const { errors } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { errorHandler } = require('../scripts/utils/error');
const ObjectNotFoundError = require('../scripts/components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../config');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const tokenVerify = require('../middlewares/tokenVerify');

// handlers auth routes
router.post('/signin', loginUser);
router.post('/signup', createUser);

// connect token verify
router.use(tokenVerify);

// handler logout route
router.get('/signout', logoutUser);

// connect main routers
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// not found router handler
router.use((
  req,
  res,
  next,
) => next(new ObjectNotFoundError(OBJECT_ERROR_CONFIG.PAGE_NOT_FOUND_MESSAGE)));

// celebrate errors handler
router.use(errors());

// connect all errors handler
router.use((error, req, res, next) => errorHandler(error, res, next));

// export main router
module.exports = router;
