const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// router.get('/addProduct',productsController.getAddProduct);
router.post('/addProduct', adminController.postAddProduct);

// router.get('/editProduct/:id', adminController.getEditProduct);
router.post('/editProduct', adminController.postEditProduct);

router.delete('/deleteProduct/:id', adminController.deleteProduct);

module.exports = router;