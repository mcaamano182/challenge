const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");

const usersService = require("../services/users")

const authorize = (
    requiredPermissions = () => true
) => async (req, res, next) => {
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
    const token = req.headers['user_access_token']
    const decoded = jwt_decode(token);

    const user_id =  decoded.user;
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

module.exports = authorize;