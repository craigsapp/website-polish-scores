{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue May 30 21:29:55 PDT 2023
// Last Modified: Tue May 30 21:29:59 PDT 2023
// Filename:      _includes/browse/toggleTextScores.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle displaying only scores containing text (lyrics).
//
{% endcomment %}

POPC2.prototype.toggleTextScores = function () {
	this.DebugMessageFunction();

	if (popc2.IsBrowsePage()) {
		popc2.VARS.SEARCH_FLAGS.TEXT = !popc2.VARS.SEARCH_FLAGS.TEXT;
		let element = document.querySelector("#text-browse-button");
		if (element) {
			if (popc2.VARS.SEARCH_FLAGS.TEXT) {
				element.classList.add("highlight");
			} else {
				element.classList.remove("highlight");
			}
		}
		if (popc2.VARS.SEARCH_FLAGS.MODERN) {
			popc2.VARS.SEARCH_FLAGS.MODERN = false;
			let element = document.querySelector("#modern-browse-button");
			element.classList.remove("highlight");
		}
		if (popc2.VARS.SEARCH_FLAGS.IIIF) {
			popc2.VARS.SEARCH_FLAGS.IIIF = false;
			let element = document.querySelector("#iiif-browse-button");
			element.classList.remove("highlight");
		}
		popc2.doBrowseSearch();
	}
};

Object.defineProperty(POPC2.prototype.toggleTextScores, "name", { value: "toggleTextScores" });





