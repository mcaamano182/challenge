const express = require('express');
const router = express.Router();

const {authorize, validateTokenCreateTutorial} = require('../../../middlewares/jwt')
const validations = require('../../../middlewares/validations')


const {
    getTutorials,
    getTutorial,
    deleteTutorial,
    createTutorial,
    updateTutorial,
    generateCreateTutorialToken,
} = require('../../../controllers/tutorials');

router.get(
    '/tutorials',
    authorize(["VIEW_TUTORIALS"]),
    getTutorials
);
router.get(
    '/tutorials/:id',
    authorize(["VIEW_TUTORIAL"]),
    getTutorial
);
router.delete(
    '/tutorials/:id',
    authorize(["DELETE_TUTORIAL"]),
    deleteTutorial
);

router.post(
    '/tutorials',
    express.json(),
    authorize(["SAVE_TUTORIAL"]),
    validateTokenCreateTutorial,
    validations.validateCreateTutorialParams,
    createTutorial
);
router.put(
    '/tutorials/:id',
    express.json(),
    authorize(["SAVE_TUTORIAL"]),
    validations.validateCreateTutorialParams,
    updateTutorial
);
router.post(
    '/tutorials/token',
    express.json(),
    authorize(["SAVE_TUTORIAL"]),
    generateCreateTutorialToken
);

module.exports = router;
