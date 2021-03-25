const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.send({ pageTitle: 'Add Product', path: '/admin/product', activateAddProduct: true });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.status(201);
    res.send();
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.send({ products: products, pageTitle: 'shop', path: '/', hasProducts: products.length > 0, activeShops: true });
    });
}