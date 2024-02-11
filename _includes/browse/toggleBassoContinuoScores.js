{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Aug 10 15:04:37 CEST 2023
// Last Modified: Thu Aug 10 15:48:06 CEST 2023
// Filename:      _includes/browse/toggleBassoContinuoScores.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle displaying only modernized scores
//
{% endcomment %}

POPC2.prototype.toggleBassoContinuoScores = function () {
	this.DebugMessageFunction();

	if (popc2.IsBrowsePage()) {
		popc2.VARS.SEARCH_FLAGS.BASSOCONTINUO = !popc2.VARS.SEARCH_FLAGS.BASSOCONTINUO;
		let element = document.querySelector("#basso-continuo-browse-button");
		if (element) {
			if (popc2.VARS.SEARCH_FLAGS.BASSOCONTINUO) {
				element.classList.add("highlight");
			} else {
				element.classList.remove("highlight");
			}
		}
		popc2.doBrowseSearch();
	}
};

Object.defineProperty(POPC2.prototype.toggleBassoContinuoScores, "name", { value: "toggleBassoContinuoScores" });



