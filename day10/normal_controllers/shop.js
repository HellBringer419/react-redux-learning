const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            let cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find((prod) => product.id === prod.id);
                if (cartProductData)
                    cartProducts.push({ product, quantity: cartProductData.quantity });
            }
            res.send({ products: cartProducts,  totalPrice:cart.totalPrice});
        })
    })
}

exports.postCart = (req, res, next) => {
    const id = req.body.id;
    Product.fetch(id, (product) => {
        Cart.addProduct(id, product.price);
        res.status(201).send({ message: "added to cart" });
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

exports.index = (req, res, next) => {
    res.send({ message: "Hii" });
}