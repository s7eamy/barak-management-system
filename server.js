// Require Express and Mongoose modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({
	path: "secrets.env",
});

// Create a new instance of an Express application
const app = new express();
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
	name: String,
	quantity: Number,
	date: String,
});
const Product = mongoose.model("Product", ProductSchema);

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use("/scripts", express.static(__dirname + "/scripts"));

// Set up a basic route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/home.html");
});

app.get("/shopping-list", (req, res) => {
	res.sendFile(__dirname + "/views/shopping.html");
});

app.post("/add-product", function (req, res) {
	const product = new Product({
		name: req.body.name,
		quantity: req.body.quantity,
		date: req.body.date,
	});
	product.save().catch((err) => console.error("Error: " + err));
});

app.get("/products", (req, res) => {
	Product.find({})
		.then((products) => {
			res.send(products);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Start the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
