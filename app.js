// import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { TOKEN_CONFIG, OBJECT_ERROR_CONFIG } = require('./config');
const limiter = require('./middlewares/limiter');
const corsVerification = require('./middlewares/cors');
const ObjectNotFoundError = require('./scripts/components/ObjectNotFoundError');
const { errorHandler } = require('./scripts/utils/error');
const { errorLogger, requestLogger } = require('./middlewares/logger');

// create server
const app = express();
// receive port from environment or 3000
const { PORT = 3000 } = process.env;

// connect to mongo data base
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

// connect protect utilities
app.use(corsVerification);
app.use(limiter);
app.use(helmet());

// connect parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(TOKEN_CONFIG.SECRET_JWT));

// connect request logger
router.use(requestLogger);

// connect main router
app.use('/api', router);

// not found router handler
app.use((
  req,
  res,
  next,
) => next(new ObjectNotFoundError(OBJECT_ERROR_CONFIG.PAGE_NOT_FOUND_MESSAGE)));

// connect errors logger
router.use(errorLogger);

// celebrate errors handler
router.use(errors());

// connect all errors handler
app.use((error, req, res, next) => errorHandler(error, res, next));

// start server
app.listen(PORT);
