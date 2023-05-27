const mongoose = require('mongoose');
const { searchDocsInDb } = require('../scripts/utils/model');

// create movie schema
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    // required: true,
  },
  director: {
    type: String,
    // required: true,
  },
  duration: {
    type: Number,
    // required: true,
  },
  year: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
    validator: URL,
  },
  trailerLink: {
    type: String,
    // required: true,
    validator: URL,
  },
  thumbnail: {
    type: String,
    // required: true,
    validator: URL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    // required: true,
  },
  nameRU: {
    type: String,
    // required: true,
  },
  nameEN: {
    type: String,
    // required: true,
  },
}, { versionKey: false });

// custom function that delete movie by id
movieSchema.statics.deleteMovieById = async function deleteMovieById(movieId) {
  const movie = await searchDocsInDb.call(this, movieId);
  return this.deleteOne(movie);
};

movieSchema.statics.createMovie = async function createMovie(props, userId) {
  const { _id } = await this.create({
    movieId: props.movieId,
    thumbnail: props.thumbnail,
    nameEN: props.nameEN,
    nameRU: props.nameRU,
    trailer: props.trailer,
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
