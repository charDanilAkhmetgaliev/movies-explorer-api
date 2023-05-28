const rateLimit = require('express-rate-limit');
const { LIMITER_CONFIG } = require('../config');

module.exports = rateLimit(LIMITER_CONFIG);
