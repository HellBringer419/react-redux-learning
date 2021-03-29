const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.send({ pageTitle: 'Add Product', path: '/admin/product', activateAddProduct: true });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.status(201).send({ message: "Product Created" });
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

exports.putProduct = (req, res, next) => {
    const product = new Product(req.body.id, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.send({ message: `Updated Product with id: ${product.id}` });
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    Product.fetch(id, (product) => {
        if (!product)
            res.redirect('/error/product');
        else {
            Product.delete(id);
            res.send({ message: `Deleted Product with id: ${id}` });
        }
    });
}