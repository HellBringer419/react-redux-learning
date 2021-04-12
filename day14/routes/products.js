const express = require("express");
const { body } = require("express-validator");

const productController = require("../controllers/products");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.post(
	"/",
	[
		body("title").trim().isLength({ min: 3 }),
		body("description").trim().isLength({ min: 1 }),
		body("price").isNumeric(),
	],
	productController.postProduct
);

router.put(
	"/",
	[
		body("title").trim().isLength({ min: 3 }),
		body("description").trim().isLength({ min: 1 }),
		body("price").isNumeric(),
	],
	productController.putProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
