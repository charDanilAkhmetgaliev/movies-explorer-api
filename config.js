// ==VALIDATION==
const VALID_CONFIG = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 29,
};

const REG_EXP_CONFIG = {
  ID: /^[0-9a-fA-F]{24}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  URL: /^https?:\/\/(www.)?[\w-]+\.[a-z]{2,}[\w\-.~:/?#@!$&'()*+,;=]*#?$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*()_+<>?/.,{};':"\\|-]{8,20}$/,
};
// ==PROTECT==
const CORS_CONFIG = {
  ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  ALLOWED_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
const PROTECT_CONFIG = {
  BCRYPT_ROUNDS: 10,
};
const TOKEN_CONFIG = {
  SECRET_JWT: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'secret-key',
  EXPIRES: '1w',
};
const COOKIE_CONFIG = {
  MAX_AGE: 3600000 * 24 * 7,
  EXPIRES_DATE: new Date(0),
};
const LIMITER_CONFIG = {
  // windowMs: промежуток времени в течении которого разрешено получать не более max запросов(в мс)
  // по истечению времени счетчик обнуляется
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
};
// ==CONTROLLERS CONFIGURATION==
const MOVIES_CONTROL_CONFIG = {
  SUCCESS_ADD_MOVIE_MESSAGE: 'фильм успешно сохранен',
  SUCCESS_DELETE_MOVIE_MESSAGE: 'фильм успешно удален',
};
const USERS_CONTROL_CONFIG = {
  SUCCESS_UPDATE_MESSAGE: 'данные пользователя успешно обновлены',
  SUCCESS_SIGNUP_MESSAGE: 'пользователь успешно зарегистрирован',
  SUCCESS_LOGIN_MESSAGE: 'пользователь успешно авторизован',
  SUCCESS_LOGOUT_MESSAGE: 'пользователь успешно деавторизован',
};
// ==ERRORS CONFIGURATION==
const DATA_ERROR_CONFIG = {
  ERROR_NAME: 'DATA_ERROR',
  STATUS_CODE: 400,
  DEF_MESSAGE: 'получены некорректные данные',
  MONGO_CAST_ERROR_MESSAGE: 'ожидается другой формат данных',
};
const AUTH_ERROR_CONFIG = {
  ERROR_NAME: 'AUTH_ERROR',
  STATUS_CODE: 401,
  DEF_MESSAGE: 'ошибка авторизации',
  COMPARE_MESSAGE: 'логин или пароль не верный',
  TOKEN_NOT_FOUND: 'личный токен авторизации не найден',
  TOKEN_NOT_VALID: 'личный токен авторизации не корректный',
};
const ROOT_ERROR_CONFIG = {
  ERROR_NAME: 'ROOT_ERROR',
  STATUS_CODE: 403,
  DEF_MESSAGE: 'нет прав доступа',
  DEL_MOVIE_MESSAGE: 'данный фильм принадлежит другому пользователю',
};
const OBJECT_ERROR_CONFIG = {
  ERROR_NAME: 'OBJECT_ERROR',
  STATUS_CODE: 404,
  DEF_MESSAGE: 'объект не найден',
  PAGE_NOT_FOUND_MESSAGE: 'страница не найдена',
  MESSAGE: (key) => `объект с ключом: ${key} не найден`,
};
const DUPLICATE_ERROR_CONFIG = {
  ERROR_NAME: 'DUPLICATE_ERROR',
  STATUS_CODE: 409,
  DEF_MESSAGE: 'данный объект уже существует',
  ERROR_CODE: 11000,
};
const SERVER_ERROR_CONFIG = {
  ERROR_NAME: 'SERVER_ERROR',
  STATUS_CODE: 500,
  DEF_MESSAGE: 'произошла ошибка сервера',
};

// constants export
module.exports = {
  VALID_CONFIG,
  REG_EXP_CONFIG,
  PROTECT_CONFIG,
  DATA_ERROR_CONFIG,
  AUTH_ERROR_CONFIG,
  ROOT_ERROR_CONFIG,
  OBJECT_ERROR_CONFIG,
  DUPLICATE_ERROR_CONFIG,
  SERVER_ERROR_CONFIG,
  USERS_CONTROL_CONFIG,
  MOVIES_CONTROL_CONFIG,
  TOKEN_CONFIG,
  COOKIE_CONFIG,
  LIMITER_CONFIG,
  CORS_CONFIG,
};
