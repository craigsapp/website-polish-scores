{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 26 01:47:25 CET 2021
// Last Modified: Fri Nov 26 01:47:27 CET 2021
// Filename:      _includes/browse/resetWorkSearchFields.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Reset work-level search fields.
//
{% endcomment %}

POPC2.prototype.resetWorkSearchFields = function () {
	this.DebugMessageFunction();

	let pitchElement = document.querySelector("#work-search-pitch");
	if (pitchElement) {
		pitchElement.value = "";
	}

	let buttonPair = document.querySelector("#search-chord-option");
	if (buttonPair) {
		let upElement   = buttonPair.querySelector("#search-chord-button-up");
		let downElement = buttonPair.querySelector("#search-chord-button-down");
		if (upElement) {
			upElement.classList.remove("hidden");
		}
		if (downElement) {
			downElement.classList.add("hidden");
		}
	}

	let zoomElement = document.querySelector("#search-zoom-option");
	if (zoomElement) {
		let minusElement = zoomElement.querySelector("#search-zoom-button-minus");
		let plusElement  = zoomElement.querySelector("#search-zoom-button-plus");
		if (minusElement) {
			minusElement.classList.add("hidden");
		}
		if (plusElement) {
			plusElement.classList.remove("hidden");
		}
	}

	popc2.displayScore();
};

Object.defineProperty(POPC2.prototype.resetWorkSearchFields, "name", { value: "resetWorkSearchFields" });



