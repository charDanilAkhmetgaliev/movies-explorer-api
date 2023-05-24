// ==CONTROLLERS CONFIGURATION==
const USERS_CONTROL_CONFIG = {
  SUCCESS_UPDATE_MESSAGE: 'данные пользователя успешно обновлены',
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
  MESSAGE_BY_ID: (id) => `объект с ID: ${id} не найден`,
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
  DATA_ERROR_CONFIG,
  AUTH_ERROR_CONFIG,
  ROOT_ERROR_CONFIG,
  OBJECT_ERROR_CONFIG,
  DUPLICATE_ERROR_CONFIG,
  SERVER_ERROR_CONFIG,
  USERS_CONTROL_CONFIG,
};
