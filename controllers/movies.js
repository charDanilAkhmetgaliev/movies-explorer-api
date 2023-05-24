// import dependencies
const Movie = require('../modules/movie');
const { errorsHandlerWrapper } = require('../scripts/utils/controller');

// GET movies route controller
module.exports.getSavedMovies = async (req, res, next) => errorsHandlerWrapper(
  () => Movie.find({}),
  res,
  next,
);

// POST movies route controller
// module.exports.createSavedMovie = async (req, res, next) => {
//  try {
//    const cardData = req.body;
//    await Movie.create(cardData);
//  } catch (error) {
//    next(error);
//  }
// };
