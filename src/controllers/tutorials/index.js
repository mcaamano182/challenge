const tutorialService = require('../../services/tutorials');

const getTutorials = async (req, res, next) => {
    try {
        const response = await tutorialService.getTutorials();
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
        const tutorial = req.body;
        const response = await tutorialService.updateTutorial(tutorial);
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

const deleteTutorial = async (req, res, next) => {
    try {
        const tutorial = req.params.id;
        const response = await tutorialService.deleteTutorial(tutorial);
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTutorials,
    getTutorial,
    deleteTutorial,
    createTutorial,
    updateTutorial
};
