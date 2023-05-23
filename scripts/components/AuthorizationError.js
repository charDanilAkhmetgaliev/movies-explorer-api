const { AUTH_ERROR_NAME, AUTH_ERROR_STATUSCODE, AUTH_ERROR_DEF_MESSAGE } = require('../../config');
class AuthorizationError extends Error {
  constructor(message = AUTH_ERROR_DEF_MESSAGE) {
    super(message);
    this.name = AUTH_ERROR_NAME;
    this.statusCode = AUTH_ERROR_STATUSCODE;
  }
}

module.exports = AuthorizationError;