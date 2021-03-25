const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), "data", "products.json");
const getAllProductsFromFile = (cb) => {
    fs.readFile(p, (error, fileContent) => {
        let products = [];
        if (error)
            cb([]);
        else
            cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getAllProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products, null, 4), (e) => {
                console.log(e);
            });
        })
    }

    static fetchAll(cb) {
        getAllProductsFromFile(cb);
    }
}