const mongoose = require('mongoose');
const ObjectNotFoundError = require('../scripts/components/ObjectNotFoundError');
const { OBJECT_ERROR_CONFIG } = require('../config');

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
movieSchema.statics.findMovieById = async function findMovieById(movieId) {
  try {
    return await this.findById(movieId);
  } catch (error) {
    throw new ObjectNotFoundError(OBJECT_ERROR_CONFIG.MESSAGE_BY_ID(movieId));
  }
};

// custom function that delete movie by id
// todo: скорректировать функцию удаления фильма
movieSchema.statics.deleteMovieById = function deleteMovieById(movieId) {
  const movie = this.findMovieById(movieId);
  this.deleteOne(movie);
};

// export movie schema as mongoose model
module.exports = mongoose.model('movie', movieSchema);
