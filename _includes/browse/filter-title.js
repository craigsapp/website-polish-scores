//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filter-title.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for creating the title search box on the browse search form.
//


//////////////////////////////
//
// buildTitleFilter -- Create the search entry for titles.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the unique titles in the COM field for each entry in the index.  The
//    title list also lists the number of entries in the full index in the
//    title search list in parentheses after the title's name.
//

function buildTitleFilter(target) {
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
	if (GLOBAL.SEARCH && GLOBAL.SEARCH.title) {
		selectedTitle = GLOBAL.SEARCH.title;
	}
	if (lastTitle) {
		selectedTitle = lastTitle;
	}

	let output = "<input type='text' class='filter title'";
	output += ` placeholder='${getTranslation("title_placeholder")}'`;
	output += ` value="${selectedTitle}"`;
	output += ">\n";

	element.innerHTML = output;
	element.onkeyup = function() { filterBrowseIndex(); };
}



