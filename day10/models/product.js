const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(require.main.filename), "data", "products.json");
const getAllProductsFromFile = (productsCallBack) => {
    fs.readFile(p, (error, fileContent) => {
        if (error)
            productsCallBack([]);
        else
            productsCallBack(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getAllProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex((product) => product.id === this.id);
                // const updatedProducts = [...products];
                products[existingProductIndex] = this;
            }
            else {
                this.id = Math.floor(Math.random() * (10000) + (1000)).toString();
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products, null, 4), (error) => {
                if (error)
                    console.error(error);
            });
        })
    }

    static fetchAll(productsCallBack) {
        getAllProductsFromFile(productsCallBack);
    }

    static fetch(id, productCallBack) {
        getAllProductsFromFile((products) => {
            productCallBack(products.find((product) => product.id === id));
        })
    }

    static delete(id) {
        getAllProductsFromFile((products) => {
            const existingProductIndex = products.findIndex((product) => product.id === id);
            const existingProduct = products[existingProductIndex];
            products.splice(existingProductIndex, 1);
            
            // products = products.filter((product) => product.id !== id);

            fs.writeFile(p, JSON.stringify(products, null, 4), (error) => {
                if (error)
                    console.error(error);
                else {
                    // removing this product from cart
                    Cart.deleteProduct(id, existingProduct.price);
                }
            });
        })
    }
}