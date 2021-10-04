// vim: ts=3


//////////////////////////////
//
// DOMContentLoaded event listener -- delegation listener for language selection
//     buttons.
//


document.addEventListener("DOMContentLoaded", function() {
	console.log("ADDING LANGUAGE LIST EVENT HANDLER ===================");
	let languageList = document.querySelector("#language-list");
	if (!languageList) {
		console.warn("ERROR: Cannot find language list");
		return;
	}

	languageList.addEventListener("click", function(event) {
		let target = event.target;
		let language = target.textContent;
		let activeQ = target.classList.contains("highlight");
		if (activeQ) {
			{% if site.debug == "true" %}
				console.log("LANGUAGE ALREADY ACTIVE", language);
			{% endif %}
			return;
		}
		{% if site.debug == "true" %}
				console.log("CHANGING TO LANGUGAE:", language);
		{% endif %}
		if (isValidLanguage(language)) {
			changeToLanguage(language);
		}
	});

});



