const db = require("../../models");
const jwt = require("jsonwebtoken");
const jwt_config = require("../../config/jwt.config")

const Users = db.User;


const validateToken = async (token, res) => {
    try {
        const user = await Users.findOne({
            where : {
                email : token.email,
                password: token.password
            }
        })
        return user;
    } catch (err) {
        throw new Error(err);
    }
};

const login = async (credentials, res) => {
    const user = await validateToken(credentials,res);
    if(user){
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
