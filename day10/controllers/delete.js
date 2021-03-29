const Product = require("../models/product");
const Cart = require("../models/cart");

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

exports.deleteProductFromCartByID = (req, res, next) => {
    const id = req.params.id;
    Product.fetch(id, (product) => {
        if (!product)
            res.redirect('/error/product');
        else {
            Cart.deleteProduct(id, product.price);
            res.send({ message: `Deleted Product with id: ${id} from cart` });
        }
    })
}
