const { validationResult } = require("express-validator");

const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
	// TODO: add pagination; requires a db

	Product.findAll((products) => {
		res.status(200).json(products);
	});
};

exports.getProduct = (req, res, next) => {
	Product.findById(req.params.id, (product) => {
		if (!product) {
			const error = new Error("No Such Product");
			error.statusCode = 404;
			next(error);
		} else {
			res.status(200).json(product);
		}
	});
};

exports.postProduct = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Invalid Product details");
		error.statusCode = 422;
		throw error;
	}

	const product = new Product(
		null,
		req.body.title,
		req.body.imageUrl,
		req.body.description,
		req.body.price,
		req.body.expiryDate ? new Date(req.body.expiryDate) : null
	);
	if (!product) {
		const error = new Error("Invalid Product details");
		error.statusCode = 422;
		throw error;
	} else {
		product.save((id) => {
			if (id === 0) {
				const error = new Error("Error while saving");
				error.statusCode = 500;
				next(error);
			} else res.status(201).json({ message: "succesful", id });
		});
	}
};

exports.putProduct = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: "Invalid Product details",
			errors: errors.array(),
		});
	}
	const product = new Product(
		req.body.id,
		req.body.title,
		req.body.imageUrl,
		req.body.description,
		req.body.price,
		req.body.expiryDate ? new Date(req.body.expiryDate) : null
	);
	if (!product) res.status(500).json({ message: "Invalid Product details" });
	else {
		product.save((id) => {
			if (id === 0) {
				const error = new Error("Error while saving");
				error.statusCode = 500;
				next(error);
			} else res.status(201).json({
				message: `Updated Product with id: ${id}`,
			});
		});
	}
};

exports.deleteProduct = (req, res, next) => {
	Product.delete(req.params.id, (id) => {
		if (!id) res.status(500).json({ message: "error" });
		else {
			if (id === -1) res.status(404).json({ message: "No Such Product" });
			else if (id === 0)
				res.status(500).json({ message: "error in write" });
			else
				res.status(200).json({
					message: `Deleted Product with id ${id}`,
				});
		}
	});
};
