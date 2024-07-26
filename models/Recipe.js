const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RecipeSchema = new Schema({
	name: String,
	tags: [String],
	ingredients: [String],
	prep_time: Number,
});
const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
