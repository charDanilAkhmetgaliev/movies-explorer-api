const { ROOT_ERROR_CONFIG } = require('../../config');

class RootNotFoundError extends Error {
  constructor(message = ROOT_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = ROOT_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = ROOT_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = RootNotFoundError;
