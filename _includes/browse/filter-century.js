// vim: ts=3



//////////////////////////////
//
// buildCenturyFilter -- Create the search entry for centuries.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the unique century ID prefixes in the cenid field for each entry in the index.
//    The century list also gives the number of entries in the full index in the
//    century search list in parentheses after century's name.
//

function buildCenturyFilter(index, target) {
	if (!index) {
		index = BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-century";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating century filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let centuries = {};
	for (let i=0; i<index.length; i++) {
		let cenid = index[i].cenid;
		if (!cenid) {
			continue;
		}
		let matches = cenid.match(/^\s*(\d\dxx)\s*:/);
		if (!matches) {
			continue;
		}
		let tag = matches[1];

		if (!centuries[tag]) {
			centuries[tag] = 1;
		} else {
			centuries[tag]++;
		}
	}

	let keys = Object.getOwnPropertyNames(centuries);
	keys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedCentury = "";
	if (SEARCH && SEARCH.century) {
		selectedCentury = SEARCH.century;
	}

	let output = "<select class='filter century'>\n";
	output += "<option value=''>";
	output += getTranslation("any_century");
	output += ` (${index.length})`;
	output += "</option>\n";
	for (let i=0; i<keys.length; i++) {
		output += '<option value="';
		let century = keys[i];
		let displayCentury = century;
		output += century.replace(/"/g, '\\"');
		output += '"'
		if (selectedCentury === century) {
			output += " selected";
		}
		output += '>';
		output += displayCentury;
		output += " (";
		output += centuries[century];
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



