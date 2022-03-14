const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");
const tutorialService = require('../../services/tutorials');
const {headers_name} = require('../../config/const')
const jwt_config = require('../../config/jwt.config')
const {validateToken} = require("../login");
const {deleteAllTutorialsVerb} = require('../../config/const')


const getTutorials = async (req, res, next) => {
    try {
        const response = await tutorialService.getTutorials(req, res);
        res.send(response);
    } catch (err) {
        next(err);
    }
};

const getTutorial = async (req, res, next) => {
    try {
        const response = await tutorialService.getTutorial(
            req.params.id
        );
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

const createTutorial = async (req, res, next) => {
    try {
        const tutorial = req.body;
        const response = await tutorialService.createTutorial(tutorial);
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};


const updateTutorial = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tutorial = req.body;
        const response = await tutorialService.updateTutorial(id, tutorial);
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

const deleteTutorial = async (req, res, next) => {
    try {
        const tutorial = req.params.id;
        if(tutorial === deleteAllTutorialsVerb){
            const response = await tutorialService.deleteAllTutorials();
            res.send(response);
        }else{
            const response = await tutorialService.deleteTutorial(tutorial);
            res.send(response);
        }
        next();
    } catch (err) {
        next(err);
    }
};

const deleteAllTutorials = async (req, res, next) => {
    try {
        const response = await tutorialService.deleteAllTutorials();
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

const generateCreateTutorialToken = async (req, res, next) => {
    try {
        const decoded = jwt_decode(req.headers[headers_name.access_token]);
        const token = jwt.sign({
            expires: Date.now(),
            id: decoded.id
        }, jwt_config.TOKEN_SECRET)
        res.send(token);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTutorials,
    getTutorial,
    deleteTutorial,
    deleteAllTutorials,
    createTutorial,
    updateTutorial,
    generateCreateTutorialToken
};
