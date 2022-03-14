const db = require("../../models");
const jwt = require("jsonwebtoken");
const jwt_config = require("../../config/jwt.config")

const login = async (credentials, res) => {
    // validaciones
    const user = await validateToken(credentials,res);
    if(user){
        // create token
        const token = jwt.sign({
            name: user.name,
            id: user.id
        }, jwt_config.TOKEN_SECRET)

        res.header('user_access_token', token).json({
            error: null,
            data: {token}
        })
    }else{
        res.send(401, 'Invalid credentials!');
    }
}

module.exports = {
    login
};
