// import dependencies
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_CONFIG, VALID_CONFIG } = require('../../config');

// init joi's validation parameters
const joiUnknown = (bool) => Joi.object().unknown(bool);
const joiObject = (data) => Joi.object().keys(data);
const stringRequired = Joi.string().required();
const numberRequired = Joi.number().required();
const regExpRequired = (url) => Joi.string().regex(url).required();

// celebrate validation wrapper
const validScheme = ({
  body = joiUnknown(false),
  headers = joiUnknown(true),
  params = joiUnknown(false),
}) => celebrate({ body, headers, params });

// create user validation scheme
const createUserScheme = validScheme({
  body: joiObject({
    name: Joi.string()
      .min(VALID_CONFIG.NAME_MIN_LENGTH)
      .max(VALID_CONFIG.NAME_MAX_LENGTH)
      .required(),
    email: regExpRequired(REG_EXP_CONFIG.EMAIL),
    password: stringRequired,
  }),
});

// login user validation scheme
const loginUserScheme = validScheme({
  body: joiObject({
    email: regExpRequired(REG_EXP_CONFIG.EMAIL),
    password: stringRequired,
  }),
});

// update user data validation scheme
const updateUserScheme = validScheme({
  body: joiObject({
    name: Joi.string()
      .min(VALID_CONFIG.NAME_MIN_LENGTH)
      .max(VALID_CONFIG.NAME_MAX_LENGTH)
      .required(),
    email: regExpRequired(REG_EXP_CONFIG.EMAIL),
  }),
});

// create movie validation scheme
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

// delete movie validation scheme
const deleteMovieScheme = validScheme({
  params: joiObject({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  updateUserScheme,
  createMovieScheme,
  deleteMovieScheme,
  createUserScheme,
  loginUserScheme,
};
