// jwtMiddleware.js
const jwt = require('jsonwebtoken');
const createError = require('http-errors');



const authorization = permission => {
    return async (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized());
        }

        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        console.log(bearerToken[0]);
        if (bearerToken[0] != 'Bearer') {
            return next(createError[401]('you dont have permission'));
        }

        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // console.log(payload);
            req.userId = payload.userId;
            req.role = payload.role;
            // console.log(user.role);
            // console.log(permission);
            if (!permission.includes(payload.role)) {
                return next(createError[401]('you dont have permission'));
            }

            next();
        } catch (err) {
            return next(createError.Unauthorized(err.message));
        }
    };
};


module.exports = {
    authorization,
}