const { VALID_ERROR_CONFIG } = require('../../config');

class ValidationError extends Error {
  constructor(message = VALID_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = VALID_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = VALID_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = ValidationError;
