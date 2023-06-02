// main errors handle wrapper
const handleErrorsWrapper = async (actions, next) => {
  try {
    await actions();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleErrorsWrapper,
};
