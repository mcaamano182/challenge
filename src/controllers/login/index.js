const loginService = require('../../services/login');

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const user = await loginService.login(credentials,res)
        res.send(user);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
};
