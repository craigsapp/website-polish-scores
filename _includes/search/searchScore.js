{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Jan 23 20:00:39 PST 2024
// Last Modified: Tue Jan 23 20:00:44 PST 2024
// Filename:      _includes/search/searchScore.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Initial a search using the msearch filter.
//
{% endcomment %}

POPC2.prototype.searchScore = function (event) {
	this.ShowWaitingCursor();

	let that = this;
	// Need a timeout; otherwise, the previous search will be
	// done (and need to use keyup and cannot use keypress event).
	setTimeout(function () {
		let inputPitch = document.querySelector("#work-search-pitch");
		if (inputPitch) {
			console.error("#work-search-pitch value = ", inputPitch.value);
		}
		that.displayScore();
	}, 10); // waiting 10 milliseconds after event to do search
}

Object.defineProperty(POPC2.prototype.searchScore, "name", { value: "searchScore" });


