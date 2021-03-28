const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/getProducts', shopController.getProducts);
router.get('/getProductByID/:id', shopController.getProductByID);

router.get('/getCart', shopController.getCart);
router.post('/addToCart', shopController.postCart);
router.delete('/deleteProductFromCartByID/:id', shopController.deleteProductFromCartByID);

router.get('/', shopController.index);

module.exports = router;