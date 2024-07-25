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
	addToTable(product);
	fetch("/add-product", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	})
		.then((response) => response)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("Error: " + error);
		});
	document.getElementById("product").value = "";
}

function removeProduct() {
	console.log("Pressed remove product!");
}

function addToTable(product) {
	var productRow = document.createElement("tr");
	for (const property in product) {
		if (property === "_id" || property === "__v") continue;
		var cell = document.createElement("td");
		cell.textContent = product[property];
		productRow.appendChild(cell);
	}
	var buttonCell = document.createElement("td");
	var completionButton = document.createElement("button");
	completionButton.innerHTML = "<i class='fas fa-solid fa-check'></i>";
	completionButton.classList.add("container");
	completionButton.onclick = removeProduct;
	completionButton.style =
		"background-color: var(--pico-ins-color); padding: 0.2rem; border: 0";
	buttonCell.appendChild(completionButton);
	productRow.appendChild(buttonCell);
	document.getElementById("list-body").appendChild(productRow);
}

window.onload = () => {
	fetch("/products")
		.then((response) => response.json())
		.then((products) => {
			products.forEach((product) => addToTable(product));
		})
		.catch((err) => console.error("Error: " + err));
};
