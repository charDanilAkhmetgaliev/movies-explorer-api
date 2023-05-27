const { handleErrorsWrapper } = require('./utils');

// errors handler wrapper function
const responseSandler = (requestHandler, res, next, message) => handleErrorsWrapper(async () => {
  const data = await requestHandler();
  res.send({ data: message || data });
}, next);

module.exports = {
  responseSandler,
};
