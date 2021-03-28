const express = require('express');

const invalidController = require('../controllers/invalid');

const router = express.Router();

router.get('/product', invalidController.noSuchProduct);

module.exports = router;