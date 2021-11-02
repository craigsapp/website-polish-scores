{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Nov  1 23:25:43 PDT 2021
// Last Modified: Mon Nov  1 23:25:46 PDT 2021
// Filename:      _includes/browse/hideRandomButton.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Hide the random button on work and browse pages.
//
{% endcomment %}

POPC2.prototype.hideRandomButton = function () {
	this.DebugMessageFunctionVerbose();
	let workRandom = document.querySelector("#random-button");
	if (workRandom) {
		workRandom.classList.add("invisible");
	}
	let browseRandom = document.querySelector("#random-browse-button");
	if (browseRandom) {
		browseRandom.classList.add("invisible");
	}
};

Object.defineProperty(POPC2.prototype.hideRandomButton, "name", { value: "hideRandomButton" });



