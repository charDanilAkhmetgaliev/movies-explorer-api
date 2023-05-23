// ==ERRORS==
// duplicate error code
module.exports.DUPLICATE_ERROR_CODE = 11000;
module.exports.PAGE_NOT_FOUND_MESSGAE = 'страница не найдена';
// function create error config by parameters
const createErrorConfig = (name, statusCode, message) => ({
  ERROR_NAME: name,
  STATUS_CODE: statusCode,
  DEF_MESSAGE: message,
});
// error configs exports
module.exports.VALID_ERROR_CONFIG = createErrorConfig('VALID_ERROR', 400, 'данные не прошли валидацию');
module.exports.AUTH_ERROR_CONFIG = createErrorConfig('AUTH_ERROR', 401, 'ошибка авторизации');
module.exports.ROOT_ERROR_CONFIG = createErrorConfig('ROOT_ERROR', 403, 'нет прав доступа');
module.exports.OBJECT_ERROR_CONFIG = createErrorConfig('OBJECT_ERROR', 404, 'объект не найден');
module.exports.DUPLICATE_ERROR_CONFIG = createErrorConfig('DUPLICATE_ERROR', 409, 'данные объект уже существует');
module.exports.SERVER_ERROR_CONFIG = createErrorConfig('SERVER_ERROR', 500, 'произошла ошибка сервера');
module.exports.CAST_ERROR_CONFIG = createErrorConfig('CAST_ERROR', 400, 'получены некорректные данные');
