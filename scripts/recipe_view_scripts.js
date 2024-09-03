document.addEventListener("DOMContentLoaded", () => {
	const recipeId = window.location.pathname.split("/").pop();
	fetch(`/api/recipes/${recipeId}`)
		.then((response) => response.json())
		.then((recipe) => {
			document.getElementById("name").innerText = recipe.name;

			document.getElementById("time").innerText = recipe.time;

			const tagsEle = document.getElementById("tags");
			recipe.tag.forEach((tag) => {
				const tagEle = document.createElement("span");
				tagEle.innerText = tag;
				tagEle.classList.add(tag.toLowerCase());
				tagEle.classList.add("badge");
				tagEle.textContent = tag.toUpperCase();
				tagsEle.appendChild(tagEle);
			});

			document.getElementById("description").innerText =
				recipe.description;

			const ingredientsEle = document.getElementById("ingredients");
			recipe.ingredient.forEach((ingredient) => {
				const ingEle = document.createElement("li");
				ingEle.innerText = ingredient;
				ingredientsEle.appendChild(ingEle);
			});

			const instructionsEle = document.getElementById("instructions");
			recipe.instruction.forEach((instruction) => {
				const insEle = document.createElement("li");
				insEle.innerText = instruction;
				instructionsEle.appendChild(insEle);
			});
		})
		.catch((err) => console.error("Error fetching recipe:", err));
});
