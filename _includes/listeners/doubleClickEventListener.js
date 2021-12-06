{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Dec  6 12:24:15 CET 2021
// Last Modified: Mon Dec  6 12:24:17 CET 2021
// Filename:      _includes/listeners/clickEventListener.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Event delegation for mouse clicks.  Clicking in the browse
//                search-results table will load a work page for the file
//                represented by that row.
//
{% endcomment %}

document.addEventListener("dblclick", function (event) {
	if (!event) {
		return;
	}
	let target = event.target;
	if (!target) {
		return;
	}
	let path = popc2.BuildPath(target);
	let pageType = popc2.GetPageType();
	if (pageType === "work") {
		popc2.processClickForIiif(event, path);
	}
});



