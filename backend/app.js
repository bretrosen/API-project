const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet'); // security middleware
const cookieParser = require('cookie-parser');
// check to see if we are in production environment
const { environment } = require('./config');
const isProduction = environment === 'production';
// initialize an Express app
const app = express();
// connect morgan middleware for req/res logging info
app.use(morgan('dev'));
// connect cookie-parser middleware for parsing cookies
app.use(cookieParser());
// parse JSON request bodies
app.use(express.json());
// add routes folder
const routes = require('./routes');
const { ValidationError } = require('sequelize');

// only enable cors in development
// React frontend will have a different server than Express
// in production, React and Express will come from the same origin
if (!isProduction) app.use(cors());

// connect helmet middleware to improve seurity
app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // connect csurf middleware for added security
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  // connect routes
  app.use(routes);

  // catch any unhandled requests and send to error handler with generic error message
  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  // catch Sequelize errors and label them as such
  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  // format errors before returning JSON response
  // responds with error title, error message, error object, and error stack trace (if in development)
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

  module.exports = app;
