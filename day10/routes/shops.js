const express = require('express');
const router = express.Router();

// const shopController = require('../normal_controllers/shop');

// router.get('/getProducts', shopController.getProducts);
// router.get('/getProductByID/:id', shopController.getProductByID);

// router.get('/getCart', shopController.getCart);
// router.post('/addToCart', shopController.postCart);
// router.delete('/deleteProductFromCartByID/:id', shopController.deleteProductFromCartByID);

// router.get('/', shopController.index);

const getController = require('../controllers/get');
const postControler = require('../controllers/post');
const putController = require('../controllers/put');
const deleteController = require('../controllers/delete');

router.get('/getProducts', getController.getProducts);
router.get('/getProductByID/:id', getController.getProductByID);

router.get('/getCart', getController.getCart);
router.post('/addToCart', postControler.postCart);
router.delete('/deleteProductFromCartByID/:id', deleteController.deleteProductFromCartByID);

router.get('/', getController.index);

module.exports = router;