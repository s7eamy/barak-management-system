function fetchStoredRecipes() {
	fetch("../recipes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((recipes) => showRecipes(recipes))
		.catch((err) => console.error("Error:", err));
}

function deleteRecipe(event) {
	const recipeName =
		event.target.parentElement.parentElement.querySelector(
			"h3"
		).textContent;
	fetch("../recipes", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: recipeName,
		}),
	})
		.then((response) => {
			if (response.ok) window.location.reload();
		})
		.catch((err) => console.error("Error:", err));
}

function showRecipes(recipes) {
	recipes = recipes.map((recipe) => {
		return {
			name: recipe.name,
			tag: recipe.tag,
			description: recipe.description,
			id: recipe.id,
		};
	});
	const recipesElem = document.getElementById("recipe-grid");
	recipes.forEach((recipe) => {
		const recipeElem = document.createElement("article");

		// setup header
		const header = document.createElement("header");
		recipeElem.append(header);

		var badges = document.createElement("div");
		recipe.tag?.forEach((tag) => {
			var span = document.createElement("span");
			span.classList.add(tag.toLowerCase());
			span.classList.add("badge");
			span.textContent = tag.toUpperCase();
			badges.appendChild(span);
		});
		header.appendChild(badges);

		var name = document.createElement("h3");
		name.textContent = recipe.name;
		header.appendChild(name);

		// setup main
		const main = document.createElement("main");
		recipeElem.appendChild(main);

		const desc = document.createElement("p");
		desc.textContent = recipe.description.slice(0, 248).concat("...");
		main.appendChild(desc);

		// setup footer
		const footer = document.createElement("footer");
		recipeElem.appendChild(footer);

		const readMoreLink = document.createElement("a");
		readMoreLink.textContent = "Read more";
		readMoreLink.classList.add("primary");
		readMoreLink.href = `/recipes/${recipe.id}`;
		footer.appendChild(readMoreLink);

		const deleteLink = document.createElement("a");
		deleteLink.textContent = "Delete recipe";
		deleteLink.classList.add("secondary");
		deleteLink.onclick = deleteRecipe;
		deleteLink.href = "#";
		footer.appendChild(deleteLink);

		recipesElem.appendChild(recipeElem);
	});
}

document.addEventListener("DOMContentLoaded", fetchStoredRecipes);
