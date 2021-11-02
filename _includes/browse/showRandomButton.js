{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Nov  1 23:29:40 PDT 2021
// Last Modified: Mon Nov  1 23:29:43 PDT 2021
// Filename:      _includes/browse/showRandomButton.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the random button on work and browse pages.
//
{% endcomment %}

POPC2.prototype.showRandomButton = function () {
	this.DebugMessageFunctionVerbose();
	let workRandom = document.querySelector("#random-button");
	if (workRandom) {
		workRandom.classList.remove("invisible");
	}
	let browseRandom = document.querySelector("#random-browse-button");
	if (browseRandom) {
		browseRandom.classList.remove("invisible");
	}
};

Object.defineProperty(POPC2.prototype.showRandomButton, "name", { value: "showRandomButton" });



