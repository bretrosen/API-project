const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

// middleware function to set a JWT
const setTokenCookie = (res, user) => {
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };
    // creating the token
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // set the token cookie
    res.cookie('token', token, {
        // maxAge in milliseconds
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

// middleware function to find User with id in JWT payload
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    // verify and parse the JWT payload
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            // query for User with id in payload
            req.user = await User.findByPk(id, {
                // don't return hashedPassword
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch (e) {
            res.clearCookie('token');
            return next();
        }
        // clear token cookie from response if user not found
        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// middleware function that requires user to be authenticated before accesing a route
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  };


  module.exports = { setTokenCookie, restoreUser, requireAuth };
