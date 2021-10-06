//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/browse.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions related to showing the browse page.
//


//////////////////////////////
//
// displayBrowsePage --
//

function displayBrowsePage() {
	{% if site.debug == "true" %}
		console.log("DISPLAYING BROWSE PAGE");
	{% endif %}
	var telement = document.querySelector("#template-browse");
	if (!telement) {
		console.error("ERROR: Cannot find #template-browse.");
		return;
	}
	var tsource = telement.textContent;
	if (!tsource) {
		console.error("ERROR: Cannot find browse-page template");
		return;
	}
	var workTemplate = Handlebars.compile(tsource);
	var output = workTemplate();

	targets = document.querySelectorAll("#content .page");

	for (let i=0; i<targets.length; i++) {
		if (targets[i].id === "browse-page") {
			targets[i].classList.remove("hidden");
			targets[i].innerHTML = output;
		}
	}

	buildBrowseFilters();
	filterBrowseIndex();
}

