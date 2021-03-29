const Product = require("../models/product");
const Cart = require("../models/cart");
const { PRODUCT_CREATED, PRODUCT_ADDED_TO_CART } = require("../static_strings/ENG");

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.status(201).send({ message: PRODUCT_CREATED });
}

exports.postCart = (req, res, next) => {
    const id = req.body.id;
    Product.fetch(id, (product) => {
        Cart.addProduct(id, product.price);
        res.status(201).send({ message: PRODUCT_ADDED_TO_CART });
    })
}
