const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");

const {headers_name} = require('../config/const')
const usersService = require("../services/users")
const loginService = require("../services/login");
const jwt_config = require("../config/jwt.config");

const authorize = (requiredPermissions = () => true) => async (req, res, next) => {
    let authorized = false;
    try {
        const userPermissions = await getUserPermissions(req, res);
        if (!requiredPermissions || !requiredPermissions.length) {
            authorized = true;
        } else if (
            requiredPermissions &&
            requiredPermissions.length &&
            userPermissions.length
        ) {
            authorized = checkPermission(requiredPermissions, userPermissions);
        }
        if (authorized) {
            next();
        } else {
            const message = `User ${req.user} is unauthorized to access ${req.url}`;
            const err = new Error(message, 401);
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

const checkPermission = (requiredPermissions, userPermissions) => {
    let authorized = false;
    if (requiredPermissions && requiredPermissions.length) {
        requiredPermissions.forEach((requiredPermission) => {
            if (
                userPermissions.some(
                    (userPermission) =>
                        userPermission.permissions.code === requiredPermission
                )
            ) {
                authorized = true;
            }
        });
    } else {
        authorized = true;
    }
    return authorized;
};

const getUserPermissions = async (req, res) => {
    const token = req.headers[headers_name.access_token]
    const decoded = jwt_decode(token);

    const user_id =  decoded.id;
    const user = await usersService.getUser(user_id);

    try {
        if (user) {
            const response = await usersService.getUserPermissions(user.role_id);
            return response;
        } else {
            const err = new Error(
                'Required header not found in request: user_access_token',
                401
            );
            res.send(401, 'Required header not found in request: user_access_token');
            throw err;
        }
    } catch (err) {
        throw err;
    }
};

const validateTokenCreateTutorial = (req, res, next) => {
    try {
        const token = req.header('user_access_token');
        const verified = jwt.verify(token, jwt_config.TOKEN_SECRET);
        var difference = Date.now() - verified.expires; // This will give difference in milliseconds
        var resultInMinute = Math.round(difference / 60000);
        if(resultInMinute < 5){
            next();
        }else{
            const message = `User access token expired.`;
            const err = new Error(message, 401);
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {authorize, validateTokenCreateTutorial};