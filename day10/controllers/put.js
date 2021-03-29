const Product = require("../models/product");

exports.putProduct = (req, res, next) => {
    const product = new Product(req.body.id, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save();
    res.send({ message: `Updated Product with id: ${product.id}` });
}
