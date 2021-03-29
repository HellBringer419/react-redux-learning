const express = require('express');
const router = express.Router();

// const invalidController = require('../normal_controllers/invalid');
const getController = require('../controllers/get');

router.get('/product', getController.noSuchProduct);

module.exports = router;