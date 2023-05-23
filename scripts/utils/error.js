// import dependencies
const mongoose = require('mongoose');
const { DUPLICATE_ERROR_CODE, SERVER_ERROR_CONFIG, CAST_ERROR_CONFIG } = require('../../config');
const DuplicateError = require('../components/DuplicateError');
const ValidationError = require('../components/ValidationError');

// function send response to client with error message
const handlerSendError = (errorData, res) => res.status(errorData.statusCode)
  .send({ error: errorData.name, message: errorData.message })
  .end();

// function - centralized all errors handler
module.exports.errorHandler = (error, res) => {
  // handle errors extended from root Error object
  if (error instanceof Error) {
    if (error.statusCode) {
      handlerSendError(error, res);
    }
    if (error.code === DUPLICATE_ERROR_CODE) {
      handlerSendError(new DuplicateError(), res);
    }
  }
  // mongoose errors handlers
  if (error instanceof mongoose.Error.CastError) {
    handlerSendError({
      name: CAST_ERROR_CONFIG.ERROR_NAME,
      message: CAST_ERROR_CONFIG.DEF_MESSAGE,
      statusCode: CAST_ERROR_CONFIG.STATUS_CODE,
    }, res);
  }
  if (error instanceof mongoose.Error.ValidationError) {
    handlerSendError(new ValidationError(), res);
  }
  // default server handler
  handlerSendError({
    name: SERVER_ERROR_CONFIG.ERROR_NAME,
    message: SERVER_ERROR_CONFIG.DEF_MESSAGE,
    statusCode: SERVER_ERROR_CONFIG.STATUS_CODE,
  }, res);
};
