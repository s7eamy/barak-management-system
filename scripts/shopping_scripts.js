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
		.then((response) => response)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("Error: " + error);
		});
	document.getElementById("product").value = "";
	document.getElementById("quantity").value = "";
}

function removeProduct(event) {
	event.preventDefault();
	const productRow = event.srcElement.parentElement.parentElement; // ugly, but gets the job done
	const cells = productRow.childNodes;
	const product = {
		name: cells[0].textContent,
		quantity: cells[1].textContent,
		date: cells[2].textContent,
	};
	console.log(product);
	fetch("/products", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	})
		.then((response) => response)
		.then((data) => console.log(data))
		.catch((error) => console.error("Error: " + error));
	productRow.classList.add("animate__animated", "animate__backOutLeft");
	productRow.onanimationend = (event) => event.srcElement.remove();
}

function addToTable(product, exists) {
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
