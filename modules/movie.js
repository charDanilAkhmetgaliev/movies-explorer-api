const mongoose = require('mongoose');
const { searchDocsInDb } = require('../scripts/utils/model');
const RootNotFoundError = require('../scripts/components/RootNotFoundError');
const { ROOT_ERROR_CONFIG } = require('../config');

// create movie schema
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validator: URL,
  },
  trailerLink: {
    type: String,
    required: true,
    validator: URL,
  },
  thumbnail: {
    type: String,
    required: true,
    validator: URL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

// custom function that delete movie by id
movieSchema.statics.deleteMovieById = async function deleteMovieById(movieId, userId) {
  const movie = await searchDocsInDb.call(this, movieId);
  if (movie.owner.toString() === userId) {
    return this.deleteOne(movie);
  }
  throw new RootNotFoundError(ROOT_ERROR_CONFIG.DEL_MOVIE_MESSAGE);
};

movieSchema.statics.createMovie = async function createMovie(props, userId) {
  const { _id } = await this.create({
    movieId: props.movieId,
    thumbnail: props.thumbnail,
    nameEN: props.nameEN,
    nameRU: props.nameRU,
    trailerLink: props.trailerLink,
    image: props.image,
    description: props.description,
    year: props.year,
    duration: props.duration,
    director: props.director,
    country: props.country,
    owner: userId,
  });
  return searchDocsInDb.call(this, _id, { popProps: ['owner'] });
};

// export movie schema as mongoose model
module.exports = mongoose.model('movie', movieSchema);
