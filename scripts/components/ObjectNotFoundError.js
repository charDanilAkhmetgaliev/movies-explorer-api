const { OBJECT_ERROR_CONFIG } = require('../../config');
class ObjectNotFoundError extends Error {
  constructor(message = OBJECT_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = OBJECT_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = OBJECT_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = ObjectNotFoundError;