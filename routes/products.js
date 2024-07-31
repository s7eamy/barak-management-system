const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", (req, res) => {
	const product = new Product(req.body);
	product
		.save()
		.then(() =>
			res.status(200).send({ message: "Product saved successfully!" })
		)
		.catch((err) => console.error("Error: " + err));
});

router.get("/", (req, res) => {
	Product.find({})
		.then((products) => {
			if (products.length == 0)
				return res.status(404).send({ message: "No products found." });
			res.status(200).send(products);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Server error" });
		});
});

router.delete("/", (req, res) => {
	Product.deleteOne(req.body)
		.then((result) => {
			if (result.deletedCount == 0) {
				return res.status(404).send({ message: "Product not found." });
			}
			res.status(200).send({ message: "Product deleted successfully." });
		})
		.catch((err) => {
			console.error("Error: " + err);
			res.status(500).send({ message: "Server error" });
		});
});

module.exports = router;
