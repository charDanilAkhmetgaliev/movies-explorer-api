// import dependencies
const Movie = require('../modules/movie');
const { errorsHandleWrapper } = require('../scripts/utils/controller');
const { MOVIES_CONTROL_CONFIG } = require('../config');

// GET movies route controller
module.exports.getSavedMovies = (req, res, next) => errorsHandleWrapper(
  () => Movie.find({}).populate('owner'),
  res,
  next,
);

module.exports.createSavedMovie = (req, res, next) => errorsHandleWrapper(
  () => {
    const {
      movieId,
      thumbnail,
      nameEN,
      nameRU,
      trailer,
      image,
      description,
      year,
      duration,
      director,
      country,
    } = req.body;
    Movie.create({
      movieId,
      thumbnail,
      nameEN,
      nameRU,
      trailer,
      image,
      description,
      year,
      duration,
      director,
      country,
      owner: req.user._id,
    });
  },
  res,
  next,
  MOVIES_CONTROL_CONFIG.SUCCESS_ADD_MOVIE_MESSAGE,
);

module.exports.deleteSavedMovie = (req, res, next) => errorsHandleWrapper(
  () => Movie.deleteMovieById(req.params.id),
  res,
  next,
  MOVIES_CONTROL_CONFIG.SUCCESS_DELETE_MOVIE_MESSAGE,
);
