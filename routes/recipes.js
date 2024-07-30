const express = require("express");
const multer = require("multer");
const router = express.Router();
const Recipe = require("../models/Recipe");

const upload = multer();

router.post("/", upload.none(), (req, res) => {
	const recipe = new Recipe(req.body);
	recipe.save().catch((err) => console.error("Error:", err));
});

router.get("/", (req, res) => {
	Recipe.find({})
		.then((recipes) => res.send(recipes))
		.catch((err) => console.error("Error:", err));
});

router.delete("/", (req, res) => {
	Recipe.deleteMany({})
		.then(() =>
			res
				.status(200)
				.send({ message: "All recipes deleted successfully!" })
		)
		.catch((err) => {
			console.error("Error:", err);
			res.status(500).send({
				error: "An error occurred while deleting recipes.",
			});
		});
});

module.exports = router;
