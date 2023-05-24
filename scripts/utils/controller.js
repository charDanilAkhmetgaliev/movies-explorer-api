// send response handler
const sendResponse = (res, data) => res.send({ data });

// errors handler wrapper function
module.exports.errorsHandleWrapper = async (requestHandler, res, next, message) => {
  try {
    const data = await requestHandler();
    sendResponse(res, () => {
      if (message) {
        return message;
      }
      return data;
    });
  } catch (error) {
    next(error);
  }
};
