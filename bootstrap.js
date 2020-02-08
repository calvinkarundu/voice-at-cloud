var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';

module.exports = function(app) {
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Routes
  require('./router')(app);
};
