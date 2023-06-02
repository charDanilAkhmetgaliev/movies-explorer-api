// import dependencies
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../scripts/components/AuthorizationError');
const { TOKEN_CONFIG, AUTH_ERROR_CONFIG } = require('../config');
const { handleErrorsWrapper } = require('../scripts/utils/utils');

// verify jwt middleware
module.exports = (req, res, next) => handleErrorsWrapper(() => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      req.user = jwt.verify(token, TOKEN_CONFIG.SECRET_JWT);
      next();
    } catch (error) {
      throw new AuthorizationError(AUTH_ERROR_CONFIG.TOKEN_NOT_VALID);
    }
  } else {
    throw new AuthorizationError(AUTH_ERROR_CONFIG.TOKEN_NOT_FOUND);
  }
}, next);
