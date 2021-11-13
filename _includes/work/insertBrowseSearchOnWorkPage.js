{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 18 10:38:54 PDT 2021
// Last Modified: Mon Oct 18 10:38:57 PDT 2021
// Filename:      _includes/shared/insertBrowseSearchOnWorkPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Copy popc2.VARS.SEARH parameters into the work page's search
//                form.
//
{% endcomment %}

POPC2.prototype.insertBrowseSearchOnWorkPage = function () {
	this.DebugMessageFunction();

	let pitchElement = document.querySelector("#work-search-pitch");
	if (pitchElement) {
		let pitchSearch = this.VARS.SEARCH.pitch || "";
		pitchElement.value = pitchSearch;

		let subpage = document.querySelector("#subpage-search");
		if (!pitchSearch.match(/^\s*$/)) {
			// Show the work search menu if there is a browse pitch search
			// to apply to the work.
			if (subpage && subpage.classList.contains("hidden")) {
				popc2.toggleSubpageDisplay('search');
			}
		} else {
			// Hide search subpage if it is visible
			if (subpage && !subpage.classList.contains("hidden")) {
				popc2.toggleSubpageDisplay('search');
			}
		}
	}

};

Object.defineProperty(POPC2.prototype.insertBrowseSearchOnWorkPage, "name", { value: "insertBrowseSearchOnWorkPage" });



