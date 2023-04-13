const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// POST route for logging in
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    // query for user by either username or email
    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    // invoke error-handling middleware if user isn't found or password doesn't match hashed password
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    //  set JWT for verified user
    await setTokenCookie(res, safeUser);

    // respond with non-sensitive user information
    return res.json({
        user: safeUser
    });
}
);

module.exports = router;
