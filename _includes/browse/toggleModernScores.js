{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Mar 19 20:08:51 PDT 2023
// Last Modified: Sun Mar 19 20:08:54 PDT 2023
// Filename:      _includes/browse/toggleModernScores.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle displaying only modernized scores
//
{% endcomment %}

POPC2.prototype.toggleModernScores = function () {
	this.DebugMessageFunction();

	if (popc2.IsBrowsePage()) {
		popc2.VARS.SEARCH_FLAGS.MODERN = !popc2.VARS.SEARCH_FLAGS.MODERN;
		let element = document.querySelector("#modern-browse-button");
		if (element) {
			if (popc2.VARS.SEARCH_FLAGS.MODERN) {
				element.classList.add("highlight");
			} else {
				element.classList.remove("highlight");
			}
		}
		popc2.doBrowseSearch();
	}
};

Object.defineProperty(POPC2.prototype.toggleModernScores, "name", { value: "toggleModernScores" });





