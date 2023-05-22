// create user router
const moviesRouter = require('express').Router();

// import controllers
const { getSavedMovies, createMovie, deleteSavedMovie } = require('../controllers/movies');

// get user saved movies route
moviesRouter.get(getSavedMovies);

// create movie route
moviesRouter.post(createMovie);

// delete user saved movie by id
moviesRouter.delete('/:_id', deleteSavedMovie);

// export user router
module.exports = moviesRouter;