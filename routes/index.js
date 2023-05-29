// create main route
const router = require('express').Router();
// import dependencies
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const tokenVerify = require('../middlewares/tokenVerify');
const { createUserScheme, loginUserScheme } = require('../scripts/utils/clb');

// handlers auth routes
router.post('/signin', loginUserScheme, loginUser);
router.post('/signup', createUserScheme, createUser);

// handler logout route
router.get('/signout', tokenVerify, logoutUser);

// connect main routers
router.use('/users', tokenVerify, usersRouter);
router.use('/movies', tokenVerify, moviesRouter);

// export main router
module.exports = router;
