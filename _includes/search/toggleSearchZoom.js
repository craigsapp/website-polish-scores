{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 12:51:11 PDT 2021
// Last Modified: Thu Oct 21 12:51:13 PDT 2021
// Filename:      _includes/browse/toggleSearchZoom.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   After runing the msearch filter, extracts its contents
//                to display on the work webpage.
//
{% endcomment %}

POPC2.prototype.toggleSearchZoom = function () {
	this.DebugMessageFunction();

	let zoomElement = document.querySelector("#search-zoom-option");
	if (!zoomElement) {
		return;
	}

	let minusElement = zoomElement.querySelector("#search-zoom-button-minus");
	let plusElement = zoomElement.querySelector("#search-zoom-button-plus");

	if (minusElement.classList.contains("hidden")) {
		minusElement.classList.remove("hidden");
		plusElement.classList.add("hidden");
	} else {
		minusElement.classList.add("hidden");
		plusElement.classList.remove("hidden");
	}

	popc2.displayScore();
};

Object.defineProperty(POPC2.prototype.toggleSearchZoom, "name", { value: "toggleSearchZoom" });



