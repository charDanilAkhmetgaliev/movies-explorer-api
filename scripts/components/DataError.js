const { DATA_ERROR_CONFIG } = require('../../config');

class DataError extends Error {
  constructor(message = DATA_ERROR_CONFIG.DEF_MESSAGE) {
    super(message);
    this.name = DATA_ERROR_CONFIG.ERROR_NAME;
    this.statusCode = DATA_ERROR_CONFIG.STATUS_CODE;
  }
}

module.exports = DataError;
