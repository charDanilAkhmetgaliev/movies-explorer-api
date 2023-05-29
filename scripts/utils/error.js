// import dependencies
const mongoose = require('mongoose');
const { DUPLICATE_ERROR_CONFIG, SERVER_ERROR_CONFIG, DATA_ERROR_CONFIG } = require('../../config');
const DuplicateError = require('../components/DuplicateError');
const DataError = require('../components/DataError');

// function send response to client with error message
const handlerSendError = (error, res) => res.status(error.statusCode)
  .send({ error: error.name, message: error.message })
  .end();

// function - centralized all errors handler
module.exports.errorHandler = (error, res) => {
  // handle errors extended from root Error object
  if (error instanceof Error) {
    if (error.statusCode) {
      handlerSendError(error, res);
      return;
    }
    if (error.code === DUPLICATE_ERROR_CONFIG.ERROR_CODE) {
      handlerSendError(new DuplicateError(), res);
      return;
    }
  }
  // mongoose errors handlers
  if (error instanceof mongoose.Error.CastError) {
    handlerSendError(new DataError(DATA_ERROR_CONFIG.MONGO_CAST_ERROR_MESSAGE), res);
    return;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    handlerSendError(new DataError(), res);
    return;
  }
  // default server handler
  handlerSendError({
    name: SERVER_ERROR_CONFIG.ERROR_NAME,
    message: SERVER_ERROR_CONFIG.DEF_MESSAGE,
    statusCode: SERVER_ERROR_CONFIG.STATUS_CODE,
  }, res);
};
