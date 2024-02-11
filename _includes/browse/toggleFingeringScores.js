{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Aug 10 15:04:37 CEST 2023
// Last Modified: Thu Aug 10 15:48:06 CEST 2023
// Filename:      _includes/browse/toggleFingeringScores.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle displaying only modernized scores
//
{% endcomment %}

POPC2.prototype.toggleFingeringScores = function () {
	this.DebugMessageFunction();

	if (popc2.IsBrowsePage()) {
		popc2.VARS.SEARCH_FLAGS.FINGERING = !popc2.VARS.SEARCH_FLAGS.FINGERING;
		let element = document.querySelector("#fintering-browse-button");
		if (element) {
			if (popc2.VARS.SEARCH_FLAGS.FINGERING) {
				element.classList.add("highlight");
			} else {
				element.classList.remove("highlight");
			}
		}
		popc2.doBrowseSearch();
	}
};

Object.defineProperty(POPC2.prototype.toggleFingeringScores, "name", { value: "toggleFingeringScores" });



