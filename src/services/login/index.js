const db = require("../../models");
const jwt = require("jsonwebtoken");
const jwt_config = require("../../config/jwt.config")
const {AuthError} = require("../../domains/errors");

const Users = db.User;


const validateCredentials = async (token) => {
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

const login = async (credentials) => {
    const user = await validateCredentials(credentials);
    if(user){
        const token = jwt.sign({
            name: user.name,
            id: user.id
        }, jwt_config.TOKEN_SECRET)

        return token;
    }else{
        throw new AuthError('Invalid credentials!');
    }
}

module.exports = {
    login
};
