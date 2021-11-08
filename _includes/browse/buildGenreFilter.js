{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildGenreFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for genres.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the genre
//                fields for each entry in the index.  The genres
//                list also gives the number of entries in the
//                full index in the genre search list in parentheses
//                after genre abbreviation.
//
{% endcomment %}

POPC2.prototype.buildGenreFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
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
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached genre counts
			genres = this.VARS.BROWSE_MENU_OPTIONS.genre;
	} else {

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
	}

	let limitedKeys = Object.getOwnPropertyNames(genres);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.genre);
	let keys        = fullKeys;

	let tgenres = [];  // Translate genres into active language.
	for (let i=0; i<fullKeys.length; i++) {
		let entry = {};
		entry.value = fullKeys[i];
		entry.count = genres[fullKeys[i]];
		entry.title = this.getTranslation(fullKeys[i].replace(/\s+/g, "_"));
		if (entry.value === "uncategorized") {
			entry.title = "ZZZZZ " + entry.title;
		}
		tgenres.push(entry);
	}

	tgenres.sort(function(a, b) {
		return a.title.localeCompare(b.title);
	});

	let selectedGenre = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.genre) {
		selectedGenre = this.VARS.SEARCH.genre;
	}

	let output = "<select class='filter genre'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_genre");
	output += ` [${limitedKeys.length}]`;
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
		if (tgenres[i].count) {
			output += ` (${tgenres[i].count})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildGenreFilter, "name", { value: "buildGenreFilter" });



