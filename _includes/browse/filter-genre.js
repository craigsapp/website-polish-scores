// vim: ts=3


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
		index = BROWSE_INDEX;
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
		tgenres.push(entry);
	}

	tgenres.sort(function(a, b) {
		return a.title.localeCompare(b.title);
	});

	let selectedGenre = "";
	if (SEARCH && SEARCH.genre) {
		selectedGenre = SEARCH.genre;
	}

	let output = "<select class='filter genre'>\n";
	output += "<option value=''>";
	output += getTranslation("any_genre");
	output += ` (${index.length})`;
	output += "</option>\n";

	for (let i=0; i<tgenres.length; i++) {
		output += '<option value="';
		output += tgenres[i].value;
		output += '"'
		if (selectedGenre === tgenres[i].value) {
			output += " selected";
		}
		output += '>';
		output += tgenres[i].title;
		output += " (";
		output += tgenres[i].count;
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



