const fs = require("fs");
const path = require("path");

const p = path.join(
	path.dirname(require.main.filename),
	"data",
	"products.json"
);
const getAllProductsFromFile = (productsCallBack) => {
	fs.readFile(p, (error, fileContent) => {
		if (error) productsCallBack([]);
		else productsCallBack(JSON.parse(fileContent));
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price, expiryDate) {
		this._id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.expiryDate = expiryDate;
	}

	save(idCallBack) {
		getAllProductsFromFile((products) => {
			if (!products) return idCallBack(0);
			if (this._id) {
				const existingProductIndex = products.findIndex(
					(product) => product._id === this._id
				);
				products[existingProductIndex] = this;
			} else {
				this._id = Math.floor(Math.random() * 10000 + 1000).toString();
				products.push(this);
			}
			fs.writeFile(p, JSON.stringify(products, null, 4), (error) => {
				if (error) {
					idCallback(0);
					console.error("[ERROR] in save:writeFile");
					console.log(error);
				} else idCallBack(this._id);
			});
		});
	}

	static findAll(productsCallBack) {
		getAllProductsFromFile(productsCallBack);
	}

	static findById(id, productCallBack) {
		getAllProductsFromFile((products) => {
			const product = products.find((product) => product._id === id);
			productCallBack(product);
		});
	}

	static delete(id, idCallBack) {
		getAllProductsFromFile((products) => {
			const product = products.findIndex((product) => product._id === id);
			if (product)
				products = products.filter((product) => product._id !== id);
			else idCallBack(-1);

			fs.writeFile(p, JSON.stringify(products, null, 4), (error) => {
				if (error) idCallBack(0);
				else {
					idCallBack(id);
				}
			});
		});
	}
};
