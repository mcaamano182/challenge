const loginService = require('../../services/login');
const {headers_name} = require('../../config/const')

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
