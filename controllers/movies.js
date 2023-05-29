// import dependencies
const Movie = require('../modules/movie');
const { responseSandler } = require('../scripts/utils/controller');
const { MOVIES_CONTROL_CONFIG } = require('../config');
const { searchDocsInDb } = require('../scripts/utils/model');

// GET movies route controller
module.exports.getSavedMovies = (req, res, next) => responseSandler(
  () => searchDocsInDb.call(Movie, 'all', { popProps: ['owner'] }),
  res,
  next,
);

module.exports.createSavedMovie = (req, res, next) => responseSandler(
  () => Movie.createMovie(req.body, req.user._id),
  res,
  next,
  // MOVIES_CONTROL_CONFIG.SUCCESS_ADD_MOVIE_MESSAGE,
);

module.exports.deleteSavedMovie = (req, res, next) => responseSandler(
  () => Movie.deleteMovieById(req.params._id, req.user._id),
  res,
  next,
  MOVIES_CONTROL_CONFIG.SUCCESS_DELETE_MOVIE_MESSAGE,
);
