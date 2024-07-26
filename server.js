// Require Express and Mongoose modules
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const recipeRoutes = require("./routes/recipes");
require("dotenv").config({
	path: "secrets.env",
});

// Create a new instance of an Express application
const app = new express();

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connected successfully!"))
	.catch((err) => console.error("MongoDB connection error: " + err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use("/scripts", express.static(__dirname + "/scripts"));

// Set up views
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/home.html");
});

app.get("/shopping-list", (req, res) => {
	res.sendFile(__dirname + "/views/shopping.html");
});

app.get("/recipe-book", (req, res) => {
	res.sendFile(__dirname + "/views/recipe_book.html");
});

// Set up shopping list routes
app.use("/products", productRoutes);

// Set up recipe book routes
app.use("/recipes", recipeRoutes);

// Start the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
