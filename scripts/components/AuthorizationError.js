const { AUTH_ERROR_CONFIG } = require('../../config');

class AuthorizationError extends Error {
  constructor(message = AUTH_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = AUTH_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = AUTH_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = AuthorizationError;
