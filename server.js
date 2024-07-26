// Require Express, Mongoose modules, require shopping-list routes
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
require("dotenv").config({
	// Get MongoDB connection URI from secret environment vars
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

// Set up middleware
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

// Set up shopping list routes
app.use("/products", productRoutes);

// Start the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
