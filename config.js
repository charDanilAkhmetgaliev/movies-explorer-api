// ==REG EXP==
const REG_EXP_CONFIG = {
};
// ==PROTECT==
const PROTECT_CONFIG = {
  BCRYPT_ROUNDS: 10,
};
// ==CONTROLLERS CONFIGURATION==
const MOVIES_CONTROL_CONFIG = {
  SUCCESS_ADD_MOVIE_MESSAGE: 'фильм успешно сохранен',
  SUCCESS_DELETE_MOVIE_MESSAGE: 'фильм успешно удален',
};
const USERS_CONTROL_CONFIG = {
  SUCCESS_UPDATE_MESSAGE: 'данные пользователя успешно обновлены',
  SUCCESS_SIGNUP_MESSAGE: 'пользователь успешно зарегистрирован',
};
// ==ERRORS CONFIGURATION==
const DATA_ERROR_CONFIG = {
  ERROR_NAME: 'VALID_ERROR',
  STATUS_CODE: 400,
  DEF_MESSAGE: 'получены некорректные данные',
  MONGO_CAST_ERROR_MESSAGE: 'ожидается другой формат данных',
};
const AUTH_ERROR_CONFIG = {
  ERROR_NAME: 'AUTH_ERROR',
  STATUS_CODE: 401,
  DEF_MESSAGE: 'ошибка авторизации',
  COMPARE_MESSAGE: 'логин или пароль не верный',
};
const ROOT_ERROR_CONFIG = {
  ERROR_NAME: 'ROOT_ERROR',
  STATUS_CODE: 403,
  DEF_MESSAGE: 'нет прав доступа',
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
};
