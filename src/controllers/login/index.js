const loginService = require('../../services/login');

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const token = await loginService.login(credentials)

        res.header('user_access_token', token).json(token);

        next();

    } catch (err) {
        res.send(err.message, err.code);
        next(err);
    }
};

module.exports = {
    login
};
