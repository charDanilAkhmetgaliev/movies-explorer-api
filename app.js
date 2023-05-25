// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

// create server
const app = express();
// receive port from environment or 3000
const { PORT = 3000 } = process.env;

// connect to mongo data base
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// connect parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// todo: удалить временную авторизацию
app.use((req, res, next) => {
  req.user = { _id: 'temp-id' };
  next();
});

// connect main router
app.use(router);

// start server
app.listen(PORT, () => {
  console.log('server is working...');
});
