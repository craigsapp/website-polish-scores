//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filter-siglum.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for creating the siglum list in the browse search form.
//


//////////////////////////////
//
// buildSiglumFilter -- Create the search entry for sigla.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the siglum fields for each entry in the index.  The sigla list also gives
//    the number of entries in the full index in the siglum search list in
//    parentheses after siglum abbreviation.
//

function buildSiglumFilter(index, target) {
	if (!index) {
		index = GLOBAL.BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-siglum";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating siglum filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let sigla = {};
	for (let i=0; i<index.length; i++) {
		let siglum = index[i].siglum;
		if (!siglum) {
			continue;
		}
		siglum = siglum.trim();

		if (!sigla[siglum]) {
			sigla[siglum] = 1;
		} else {
			sigla[siglum]++;
		}
	}

	let keys = Object.getOwnPropertyNames(sigla);
	keys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedSiglum = "";
	if (GLOBAL.SEARCH && GLOBAL.SEARCH.siglum) {
		selectedSiglum = GLOBAL.SEARCH.siglum;
	}

	let output = "<select class='filter siglum'>\n";

	output += "<option value=''>";
	output += getTranslation("any_library");
	output += ` (${keys.length})`;
	output += "</option>\n";

	for (let i=0; i<keys.length; i++) {
		output += '<option value="';
		let siglum = keys[i];
		let displaySiglum = siglum;
		output += siglum.replace(/"/g, '\\"');
		output += '"'
		if (selectedSiglum === siglum) {
			output += " selected";
		}
		output += '>';
		output += displaySiglum;
		output += " (";
		output += sigla[siglum];
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



