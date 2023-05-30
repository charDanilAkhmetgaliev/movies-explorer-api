// import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routes/index');
const { TOKEN_CONFIG } = require('./config');
const limiter = require('./middlewares/limiter');
const corsVerification = require('./middlewares/cors');

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

// connect main router
app.use('/api', router);

// start server
app.listen(PORT);
