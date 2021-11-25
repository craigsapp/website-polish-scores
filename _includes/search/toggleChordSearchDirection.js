{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 12:51:11 PDT 2021
// Last Modified: Thu Oct 21 12:51:13 PDT 2021
// Filename:      _includes/browse/toggleChordSearchDirection.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   After runing the msearch filter, extracts its contents
//                to display on the work webpage.
//
{% endcomment %}

POPC2.prototype.toggleChordSearchDirection = function () {
	this.DebugMessageFunction();

	let buttonPair = document.querySelector("#search-chord-option");
	if (!buttonPair) {
		console.error("Error: cannot find #search-chord-option");
	}
	let upElement = buttonPair.querySelector("#search-chord-button-up");
	if (!upElement) {
		return;
	}
	let downElement = buttonPair.querySelector("#search-chord-button-down");
	if (!downElement) {
		return;
	}
	let upState = !upElement.classList.contains("hidden");
	if (upState) {
		upElement.classList.add("hidden");
		downElement.classList.remove("hidden");
	} else {
		upElement.classList.remove("hidden");
		downElement.classList.add("hidden");
	}
	popc2.displayScore();

};

Object.defineProperty(POPC2.prototype.toggleChordSearchDirection, "name", { value: "toggleChordSearchDirection" });



