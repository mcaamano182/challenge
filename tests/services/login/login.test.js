const chai = require('chai');
const expect = chai.expect;

const jwt_config = require('../../../src/config/jwt.config');
const jwt = require('jsonwebtoken');
const {login} = require('../../../src/services/login');

describe("Login Service test", function() {

    it("should test login OK", async () => {
        let credentials={email:'mcaamano182@gmail.com', password:'password'};

        const token = await login(credentials);
        jwt.verify(token, jwt_config.TOKEN_SECRET);

        expect(token != null).equal(true);


    });

    it("should test login bad credentials", async () => {
        let credentials={email:'mcaamano182@gmail.com', password:''};

        try{
            const token = await login(credentials);
            jwt.verify(token, jwt_config.TOKEN_SECRET);
        }catch (err){
            expect(err.code).equal(401);
        }
    });

});