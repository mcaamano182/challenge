const express = require('express');
const router = express.Router();

const jwt = require('../../../middlewares/jwt')

const {
    getTutorials,
    getTutorial,
    deleteTutorial,
    createTutorial,
    updateTutorial,
} = require('../../../controllers/tutorials');

router.get(
    '/tutorials',
    jwt(["VIEW_TUTORIALS"]),
    getTutorials
);
router.get(
    '/tutorials/:id',
    jwt(["VIEW_TUTORIAL"]),
    getTutorial
);
router.delete(
    '/tutorials/:id',
    jwt(["DELETE_TUTORIAL"]),
    deleteTutorial

);
router.post(
    '/tutorials',
    express.json(),
    jwt(["SAVE_TUTORIAL"]),
    createTutorial
);
router.put(
    '/tutorials/:id',
    express.json(),
    jwt(["SAVE_TUTORIAL"]),
    updateTutorial
);

module.exports = router;
