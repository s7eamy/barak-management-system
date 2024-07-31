const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RecipeSchema = new Schema({
	name: String,
	description: String,
	tag: [String], // could be difficulty, breakfast/lunch/dinner, etc
	ingredient: [String],
	time: Number,
	instruction: [String],
});
const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
