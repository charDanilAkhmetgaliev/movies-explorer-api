// import dependencies
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_CONFIG, VALID_CONFIG } = require('../../config');

const joiUnknown = (bool) => Joi.object().unknown(bool);
const joiObject = (data) => Joi.object().keys(data);
const stringRequired = Joi.string().required();
const numberRequired = Joi.number().required();
const regExpRequired = (url) => Joi.string().regex(url).required();

const validScheme = ({
  body = joiUnknown(false),
  headers = joiUnknown(true),
  params = joiUnknown(false),
}) => celebrate({ body, headers, params });

const updateUserScheme = validScheme({
  body: joiObject({
    name: Joi.string()
      .min(VALID_CONFIG.NAME_MIN_LENGTH)
      .max(VALID_CONFIG.NAME_MAX_LENGTH)
      .required(),
    email: regExpRequired(REG_EXP_CONFIG.EMAIL),
  }),
});

const createMovieScheme = validScheme({
  body: joiObject({
    country: stringRequired,
    director: stringRequired,
    duration: numberRequired,
    year: stringRequired,
    description: stringRequired,
    image: regExpRequired(REG_EXP_CONFIG.URL),
    trailerLink: regExpRequired(REG_EXP_CONFIG.URL),
    thumbnail: regExpRequired(REG_EXP_CONFIG.URL),
    movieId: numberRequired,
    nameRU: stringRequired,
    nameEN: stringRequired,
  }),
});

module.exports = {
  updateUserScheme,
  createMovieScheme,
};
