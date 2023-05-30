// import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routes/index');
const { TOKEN_CONFIG, MONGO_DB_CONFIG } = require('./config');
const limiter = require('./middlewares/limiter');
const corsVerification = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// create server
const app = express();
// receive port from environment or 3000
const { PORT = 3000 } = process.env;

// connect to mongo data base
mongoose.connect(MONGO_DB_CONFIG.URL);

// connect request logger
router.use(requestLogger);

// connect protect utilities
app.use(corsVerification);
app.use(limiter);
app.use(helmet());

// connect parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(TOKEN_CONFIG.SECRET_JWT));

// connect main router
app.use('/api', router);

// connect errors logger
router.use(errorLogger);

// start server
app.listen(PORT);
