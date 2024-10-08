const express = require("express");
const multer = require("multer");
const router = express.Router();
const Recipe = require("../models/Recipe");
const nanoid = require("nanoid");

const upload = multer();

router.post("/", upload.none(), (req, res) => {
	const recipeId = nanoid(7);
	const recipe = new Recipe({
		...req.body,
		id: recipeId,
	});
	recipe.save().catch((err) => console.error("Error:", err));
	res.sendStatus(200);
});

router.get("/", (req, res) => {
	Recipe.find({})
		.then((recipes) => res.send(recipes))
		.catch((err) => console.error("Error:", err));
});

router.get("/:id", (req, res) => {
	const recipeId = req.params.id;
	Recipe.findOne({ id: recipeId })
		.then((recipe) => res.send(recipe))
		.catch((err) => console.error("Error:", err));
});

router.delete("/", (req, res) => {
	console.log(req.body);
	Recipe.deleteOne(req.body)
		.then(() =>
			res.status(200).send({ message: "Recipe deleted successfully!" })
		)
		.catch((err) => {
			console.error("Error:", err);
			res.status(500).send({
				error: "An error occurred while deleting recipe.",
			});
		});
});

module.exports = router;
