{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
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

document.addEventListener("click", function (event) {
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
		if (event.altKey) {
			popc2.processClickForIiif(event, path);
		}
	} else if (pageType === "browse") {
		let workid = popc2.getBrowseWorkId(path);
		if (workid) {
			popc2.displayWorkPage(workid);
		}
	}

});



