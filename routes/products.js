const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", (req, res) => {
	const product = new Product(req.body);
	product.save().catch((err) => console.error("Error: " + err));
});

router.get("/", (req, res) => {
	Product.find({})
		.then((products) => {
			res.send(products);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.delete("/", (req, res) => {
	Product.deleteOne(req.body).catch((err) => console.error("Error: " + err));
});

module.exports = router;
