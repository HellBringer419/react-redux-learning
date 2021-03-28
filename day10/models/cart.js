const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex((product) => product.id === id);
            const existingProduct = cart.products[existingProductIndex];

            if (existingProduct) {
                let updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                let updatedProduct = { id: id, quantity: 1 }
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart, null, 4), (err) => {
                if (err)
                    console.error(err);
            });
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            if (error)
                return;
            let cart = { products: [], totalPrice: 0 };
            if (!error) {
                cart = JSON.parse(fileContent);
                const product = cart.products.find((product) => product.id === id);

                if (!product)
                    return;
                let updatedProducts = cart.products;
                updatedProducts = updatedProducts.filter((product) => product.id !== id);

                cart.products = updatedProducts;
                cart.totalPrice = cart.totalPrice - (productPrice * product.quantity);

                fs.writeFile(p, JSON.stringify(cart, null, 4), (err) => {
                    if (err)
                        console.error(err);
                });
            }
        });
    }

    static getCart(cartCallBack) {
        fs.readFile(p, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!error) {
                cart = JSON.parse(fileContent);
                if (!cart)
                    cartCallBack(null);
                else
                    cartCallBack(cart);
            }
        });
    }
}