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
		popc2.VARS.SEARCH_FLAGS.TEXT = (popc2.VARS.SEARCH_FLAGS.TEXT + 1) % 3;
		let element = document.querySelector("#text-browse-button");
		if (element) {
			if (popc2.VARS.SEARCH_FLAGS.TEXT == 1) {
				element.classList.add("highlight");
			} else if (popc2.VARS.SEARCH_FLAGS.TEXT == 2) {
				element.classList.remove("highlight");
				// The following is needed for some reason to activate
				// the immediate unlighting of the button.
				element.blur();
			} else {
				element.classList.remove("highlight");
				// The following is needed for some reason to activate
				// the immediate unlighting of the button.
				element.blur()
			}
		}
		let banElement = document.querySelector("#ban-icon");
		if (banElement) {
			if (popc2.VARS.SEARCH_FLAGS.TEXT == 1) {
				banElement.style.display = "none";
			} else if (popc2.VARS.SEARCH_FLAGS.TEXT == 2) {
				banElement.style.display = "inline-block";
			} else {
				banElement.style.display = "none";
			}
		}
		popc2.doBrowseSearch();
	}
};

Object.defineProperty(POPC2.prototype.toggleTextScores, "name", { value: "toggleTextScores" });





