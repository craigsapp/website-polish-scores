// vim: ts=3


//////////////////////////////
//
// buildNationalityFilter -- Create the search entry for nationalities.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the nationality fields for each entry in the index.  The nationalities list also gives
//    the number of entries in the full index in the nationality search list in
//    parentheses after nationality.
//

function buildNationalityFilter(index, target) {
	if (!index) {
		index = BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-nationality";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating nationality filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let nationalities = {};
	for (let i=0; i<index.length; i++) {
		let nationality = index[i].CNT;
		if (!nationality) {
			continue;
		}
		nationality = nationality.trim();
		pieces = nationality.split(/\s*;\s*/);

		for (let j=0; j<pieces.length; j++) {
			if (!nationalities[pieces[j]]) {
				nationalities[pieces[j]] = 1;
			} else {
				nationalities[pieces[j]]++;
			}
		}
	}

	let tnationalities = [];
	let keys = Object.getOwnPropertyNames(nationalities);
	for (let i=0; i<keys.length; i++) {
		let entry = {};
		entry.value = keys[i];
		entry.count = nationalities[keys[i]];
		entry.title = getTranslation(keys[i].replace(/\s+/g, "_"));
		if (entry.value === "undetermined") {
			entry.title = "ZZZZZ " + entry.title;
		}
		tnationalities.push(entry);
	}

	tnationalities.sort(function(a, b) {
		return a.title.localeCompare(b.title);
	});

	let selectedNationality = "";
	if (SEARCH && SEARCH.nationality) {
		selectedNationality = SEARCH.nationality;
	}

	let output = "<select class='filter nationality'>\n";

	output += "<option value=''>";
	output += getTranslation("any_nationality");
	output += ` (${tnationalities.length})`;
	output += "</option>\n";

	for (let i=0; i<tnationalities.length; i++) {
		output += '<option value="';
		output += tnationalities[i].value;
		output += '"'
		if (selectedNationality === tnationalities[i].value) {
			output += " selected";
		}
		output += '>';
		output += tnationalities[i].title.replace("ZZZZZ ", "");;
		output += " (";
		output += tnationalities[i].count;
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



