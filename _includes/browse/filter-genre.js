//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filter-genre.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for creating the genre list in the browse search form.
//


//////////////////////////////
//
// buildGenreFilter -- Create the search entry for genres.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the genre fields for each entry in the index.  The genres list also gives
//    the number of entries in the full index in the genre search list in
//    parentheses after genre abbreviation.
//

function buildGenreFilter(index, target) {
	if (!index) {
		index = GLOBAL.BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-genre";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating genre filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let genres = {};
	for (let i=0; i<index.length; i++) {
		let genre = index[i].AGN;
		if (!genre) {
			continue;
		}
		genre = genre.trim();
		pieces = genre.split(/\s*;\s*/);

		for (let j=0; j<pieces.length; j++) {
			if (!genres[pieces[j]]) {
				genres[pieces[j]] = 1;
			} else {
				genres[pieces[j]]++;
			}
		}
	}

	let tgenres = [];
	let keys = Object.getOwnPropertyNames(genres);
	for (let i=0; i<keys.length; i++) {
		let entry = {};
		entry.value = keys[i];
		entry.count = genres[keys[i]];
		entry.title = getTranslation(keys[i].replace(/\s+/g, "_"));
		if (entry.value === "uncategorized") {
			entry.title = "ZZZZZ " + entry.title;
		}
		tgenres.push(entry);
	}

	tgenres.sort(function(a, b) {
		return a.title.localeCompare(b.title);
	});

	let selectedGenre = "";
	if (GLOBAL.SEARCH && GLOBAL.SEARCH.genre) {
		selectedGenre = GLOBAL.SEARCH.genre;
	}

	let output = "<select class='filter genre'>\n";

	output += "<option value=''>";
	output += getTranslation("any_genre");
	output += ` (${tgenres.length})`;
	output += "</option>\n";

	for (let i=0; i<tgenres.length; i++) {
		output += '<option value="';
		output += tgenres[i].value;
		output += '"'
		if (selectedGenre === tgenres[i].value) {
			output += " selected";
		}
		output += '>';
		output += tgenres[i].title.replace("ZZZZZ ", "");
		output += " (";
		output += tgenres[i].count;
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



