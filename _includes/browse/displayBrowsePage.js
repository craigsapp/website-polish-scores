{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/displayBrowsePage.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Generates the browse page starting with a
//                Handlebars template.
//
{% endcomment %}

POPC2.prototype.displayBrowsePage = function () {
	this.DebugMessageFunction();
	this.hideWorkNavigator();
	var telement = document.querySelector("#template-browse");
	if (!telement) {
		console.error("ERROR: Cannot find #template-browse.");
		return;
	}
	var tsource = telement.textContent;
	if (!tsource) {
		console.error("ERROR: Cannot find browse-page template");
		return;
	}
	var browseTemplate = Handlebars.compile(tsource);
	var output = browseTemplate();

	let pageElement = this.ShowPage("browse");
	if (pageElement) {
		pageElement.innerHTML = output;
	}

	if (this.VARS.BROWSE_STYLE === "more") {
		this.showBrowseMore();
	} else {
		this.showBrowseLess();
	}

	this.buildBrowseFilters();
	this.doBrowseSearch();
};

Object.defineProperty(POPC2.prototype.displayBrowsePage, "name", { value: "displayBrowsePage" });



