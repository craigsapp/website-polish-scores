// vim: ts=3


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
	if (SEARCH && SEARCH.title) {
		selectedTitle = SEARCH.title;
	}
	if (lastTitle) {
		selectedTitle = lastTitle;
	}

	let output = "<input type='text' style='width:350px;' class='filter title'";
	output += ` placeholder='${getTranslation("title_placeholder")}'`;
	output += ` value="${selectedTitle}"`;
	output += ">\n";

	element.innerHTML = output;
	element.onkeyup = function() { filterBrowseIndex(); };
}



