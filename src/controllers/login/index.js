const loginService = require('../../services/login');

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const token = await loginService.login(credentials)
        res.header('user_access_token', token).json(token);
        next();
    } catch (err) {
        res.status(err.code).send({code: err.code, message: err.message})
        next(err);
    }
};

module.exports = {
    login
};
