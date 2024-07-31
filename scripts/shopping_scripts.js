/**
 * Adds a product to shopping list by getting inputs from document
 * @param {Event} event Mouse click event from pressing the button
 */
function addProduct(event) {
	event.preventDefault();
	const productInput = document.getElementById("product").value;
	const quantityInput = document.getElementById("quantity").value;
	const currentDate = new Date().toLocaleDateString();
	if (productInput === "" || quantityInput === "") {
		alert("You must fill both fields!");
		return;
	}
	const product = {
		name: productInput,
		quantity: quantityInput,
		date: currentDate,
	};
	addToTable(product, false);
	fetch("/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => {
			console.error("Error:", error);
		});
	document.getElementById("product").value = "";
	document.getElementById("quantity").value = "";
}

/**
 * Removes product from shopping list by finding the button's parent row and identifying product from it. Deletes the HTML table row
 * @param {Event} event
 */
function removeProduct(event) {
	event.preventDefault();
	const productRow = event.srcElement.parentElement.parentElement; // ugly, but gets the job done
	const cells = productRow.childNodes;
	const product = {
		name: cells[0].textContent,
		quantity: cells[1].textContent,
		date: cells[2].textContent,
	};
	fetch("/products", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error("Error:", error));
	productRow.classList.add("animate__animated", "animate__backOutLeft");
	productRow.onanimationend = (event) => event.srcElement.remove();
}

/**
 * Adds product to HTML table
 * @param {Object} product Product object with name, quantity and date properties
 * @param {Boolean} exists True if product already exists in db, false otherwise
 */
function addToTable(product, exists) {
	var productRow = document.createElement("tr");

	// add product properties
	for (const property in product) {
		if (property === "_id" || property === "__v") continue;
		var cell = document.createElement("td");
		cell.textContent = product[property];
		productRow.appendChild(cell);
	}

	// add completion button which deletes product
	var buttonCell = document.createElement("td");
	var completionButton = document.createElement("button");
	completionButton.innerHTML = "<i class='fas fa-solid fa-check'></i>";
	completionButton.classList.add("container");
	completionButton.onclick = removeProduct;
	completionButton.style =
		"background-color: var(--pico-ins-color); padding: 0.2rem; border: 0";
	buttonCell.appendChild(completionButton);
	productRow.appendChild(buttonCell);

	// if product is new, then add entrance animation
	if (!exists)
		productRow.classList.add("animate__animated", "animate__backInRight");

	document.getElementById("list-body").appendChild(productRow);
}

window.onload = () => {
	fetch("/products")
		.then((response) => response.json())
		.then((products) => {
			products.forEach((product) => addToTable(product, true));
		})
		.catch((err) => console.error("Error: " + err));
};
