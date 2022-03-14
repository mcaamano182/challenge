const express = require('express');
const router = express.Router();

const tutorials = require('./tutorials');

router.use(tutorials);

module.exports = router;
