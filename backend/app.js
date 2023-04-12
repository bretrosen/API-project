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

  module.exports = app;
