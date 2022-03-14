const express = require('express');
const router = express.Router();

const jwt = require('./../middlewares/jwt');
const loginService = require('./../services/login');

router.post('/login', async (req, res) => {
    // validaciones
    const user = loginService.checkUserCredentials(req,res);
    if(valid){
        // create token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.header('user_access_token', token).json({
            error: null,
            data: {token}
        })
    }else{
        res.send(401, 'Invalid credentials!');
    }
})

module.exports = router;
