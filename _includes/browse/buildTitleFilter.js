{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildTitleFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for titles.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the unique
//                titles in the COM field for each entry in the
//                index.  The title list also lists the number of
//                entries in the full index in the title search
//                list in parentheses after the title's name.
//
{% endcomment %}

POPC2.prototype.buildTitleFilter = function (target) {
	this.DebugMessageFunctionVerbose();
	if (!target) {
		target = "#filter-title";
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let ielement = element.querySelector("input");
	let lastTitle = "";
	if (ielement) {
		lastTitle = ielement.value;
	}

	let selectedTitle = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.title) {
		selectedTitle = this.VARS.SEARCH.title;
	}
	if (lastTitle) {
		selectedTitle = lastTitle;
	}

	let output = "<input type='text' class='filter title'";
	output += ` placeholder='${this.getTranslation("title_placeholder")}'`;
	output += ` value="${selectedTitle}"`;
	output += ">\n";

	element.innerHTML = output;
	let that = this;
	element.onkeyup = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildTitleFilter, "name", { value: "buildTitleFilter" });


