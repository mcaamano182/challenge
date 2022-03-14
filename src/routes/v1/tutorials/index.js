const express = require('express');
const router = express.Router();

const {authorize, validateTokenCreateTutorial} = require('../../../middlewares/jwt')

const {
    getTutorials,
    getTutorial,
    deleteTutorial,
    deleteAllTutorials,
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
    createTutorial
);
router.put(
    '/tutorials/:id',
    express.json(),
    authorize(["SAVE_TUTORIAL"]),
    updateTutorial
);
router.post(
    '/tutorials/token',
    express.json(),
    authorize(["SAVE_TUTORIAL"]),
    generateCreateTutorialToken
);

module.exports = router;
