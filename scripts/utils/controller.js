// send response handler
const sendResponse = (res, response) => res.send({ data: response() });

// errors handler wrapper function
module.exports.errorsHandleWrapper = async (requestHandler, res, next, message) => {
  try {
    const data = await requestHandler();
    // todo: удалить логи
    // console.log(data);
    sendResponse(res, () => message || data);
  } catch (error) {
    next(error);
  }
};
