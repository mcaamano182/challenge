const chai = require('chai');
const expect = chai.expect;
const { Op } = require('sequelize');
const {AuthError} = require('../../src/domains/errors')

const {
    login
} = require('../../src/services/login');

describe("Login Service test", function() {

    it("should test login OK", async () => {
        let credentials = {email:"mcaamano182@gmail.com", password:"password"};

        const token = await login(credentials);

        expect(token!=null).equal(true);
    });

    it("should test login bad credentials", async () => {
        let credentials = {email:"nadie", password:"nadie"};

        try{
            await login(credentials);
        }catch (err){
            expect(err.code).equal(401);
        }

    });

});