// create user router
const moviesRouter = require('express').Router();

// import controllers
const { getSavedMovies, createSavedMovie, deleteSavedMovie } = require('../controllers/movies');

// handler get user saved movies route
moviesRouter.get('/', getSavedMovies);

// handler create movie route
moviesRouter.post('/', createSavedMovie);

// handler delete user saved movie by id
moviesRouter.delete('/:_id', deleteSavedMovie);

// export user router
module.exports = moviesRouter;
