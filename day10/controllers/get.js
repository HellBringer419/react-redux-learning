const Product = require("../models/product");
const Cart = require("../models/cart");
const { INDEX_HI, NOT_FOUND_ERROR, NO_SUCH_PRODUCT_ERROR } = require("../static_strings/ENG");

exports.index = (req, res, next) => {
    res.send({ message: INDEX_HI });
}

exports.getAddProduct = (req, res, next) => {
    res.send({ pageTitle: 'Add Product', path: '/admin/product', activateAddProduct: true });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode)
        res.redirect("/");
    const id = req.params.id;
    Product.fetch(id, (product) => {
        if (!product)
            res.redirect('/error/product');
        else
            res.send({ pageTitle: 'Add Product', path: '/admin/product', editing: editMode, product: product });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            let cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find((prod) => product.id === prod.id);
                if (cartProductData)
                    cartProducts.push({ product, quantity: cartProductData.quantity });
            }
            res.send({ products: cartProducts, totalPrice: cart.totalPrice });
        })
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.send({ products: products, pageTitle: 'shop', path: '/', hasProducts: products.length > 0, activeShops: true });
    });
}

exports.getProductByID = (req, res, next) => {
    const id = req.params.id;
    Product.fetch(id, (product) => {
        if (!product)
            res.redirect('/error/product');
        else
            res.send(product);
    });
}

exports.notFound = (req, res, next) => {
    res.status(404).send({Error: NOT_FOUND_ERROR, status: '404', timestamp:  (new Date()).toJSON()});
}

exports.noSuchProduct = (req, res, next) => {
    res.status(404).send({Error: NO_SUCH_PRODUCT_ERROR, status: '404', timestamp:  (new Date()).toJSON()});
}