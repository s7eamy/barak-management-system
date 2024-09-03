document.addEventListener("DOMContentLoaded", () => {
	const recipeId = window.location.pathname.split("/").pop();
	fetch(`/api/recipes/${recipeId}`)
		.then((response) => response.json())
		.then((recipe) => {
			document.getElementById("name").innerText = recipe.name;

			document.getElementById("time").innerText = recipe.time;

			const tagsEle = document.getElementById("tags");
			recipe.tags.forEach((tag) => {
				tagEle = document.createElement("span");
				tagEle.innerText = tag;
				tagsEle.appendChild(tagEle);
			});

			document.getElementById("description").innerText =
				recipe.description;

			const ingredientsEle = document.getElementById("ingredients");
			recipe.ingredients.forEach((ingredient) => {
				ingEle = document.createElement("li");
				ingEle.innerText = ingredient;
				ingredientsEle.appendChild(ingEle);
			});

			const instructionsEle = document.getElementById("instructions");
			recipe.instructions.forEach((instruction) => {
				insEle = document.createElement("li");
				insEle.innerText = instruction;
				instructionsEle.appendChild(insEle);
			});
		})
		.catch((err) => console.error("Error fetching recipe:", err));
});
