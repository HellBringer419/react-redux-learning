const express = require('express');
const router = express.Router();

// const adminController = require('../normal_controllers/admin');

// // router.get('/addProduct',productsController.getAddProduct);
// router.post('/addProduct', adminController.postAddProduct);

// // router.get('/editProduct/:id', adminController.getEditProduct);
// router.put('/editProduct', adminController.putProduct);

// router.delete('/deleteProduct/:id', adminController.deleteProduct);

const getController = require('../controllers/get');
const postControler = require('../controllers/post');
const putController = require('../controllers/put');
const deleteController = require('../controllers/delete');

router.post('/addProduct', postControler.postAddProduct);
router.put('/editProduct', putController.putProduct);
router.delete('/deleteProduct/:id', deleteController.deleteProduct);

module.exports = router;