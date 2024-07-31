function initializeEventHandlers() {
	const instructionBtn = document.getElementById("add-instruction");
	instructionBtn.addEventListener("click", (event) => {
		appendInstructionField(event);
	});

	const ingredientBtn = document.getElementById("add-ingredient");
	ingredientBtn.addEventListener("click", (event) => {
		appendIngredientField(event);
	});

	const instructionList = document.getElementById("instruction-list");
	instructionList.addEventListener("keydown", (event) => {
		if (event.target.name === "instruction" && event.key === "Enter") {
			appendInstructionField(event);
		}
	});

	const ingredientList = document.getElementById("ingredient-list");
	ingredientList.addEventListener("keydown", (event) => {
		if (event.target.name === "ingredient" && event.key === "Enter") {
			appendIngredientField(event);
		}
	});
}

function appendInstructionField(event) {
	event.preventDefault();
	const list = document.getElementById("instruction-list");
	const item = document.createElement("li");
	const textarea = document.createElement("textarea");

	textarea.rows = 2;
	textarea.placeholder = "Enter instruction here...";
	textarea.name = "instruction";

	item.appendChild(textarea);
	list.appendChild(item);

	textarea.focus();
}

function appendIngredientField(event) {
	event.preventDefault();
	const list = document.getElementById("ingredient-list");
	const item = document.createElement("li");
	const input = document.createElement("input");

	input.type = "text";
	input.placeholder = "Add ingredient here...";
	input.name = "ingredient";

	item.appendChild(input);
	list.appendChild(item);

	input.focus();
}

function addRecipe(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);

	fetch(form.action, {
		method: form.method,
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				form.reset();
				alert("Recipe added successfully!");
				window.location.href = "/recipe-book";
			} else {
				alert("Failed to submit recipe.");
			}
		})
		.catch((err) => {
			console.error("Error:", err);
			alert("An error occured while submitting the recipe.");
		});
}

document.addEventListener("DOMContentLoaded", initializeEventHandlers);
