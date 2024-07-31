function deleteRecipes(event) {
	event.preventDefault();
	fetch("../recipes", {
		method: "DELETE",
	});
}
