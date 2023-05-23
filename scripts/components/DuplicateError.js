const { DUPLICATE_ERROR_CONFIG } = require('../../config');
class DuplicateError extends Error {
  constructor(message = DUPLICATE_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = DUPLICATE_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = DUPLICATE_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = DuplicateError;