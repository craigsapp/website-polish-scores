{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/navigator/listeners.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Delegation listener for language selection buttons.
//
{% endcomment %}

document.addEventListener("DOMContentLoaded", function() {
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
			popc2.DebugMessage("LANGUAGE ALREADY ACTIVE: " + language, "white");
			return;
		}
		popc2.DebugMessage("CHANGING TO LANGUAGE: " + language, "gray");
		if (popc2.IsValidLanguage(language)) {
			popc2.ChangePageLanguage(language);
		}
	});

});



