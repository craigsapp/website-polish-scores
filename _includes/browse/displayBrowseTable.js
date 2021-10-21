{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/displayBrowseTable.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display a list of works on the browse
//                page.   The last search results on the browse page,
//                stored in VARS.SEARCH_RESULTS will be used to display
//                the list if no list is given as input to this function.
//
{% endcomment %}

POPC2.prototype.displayBrowseTable = function (results, target) {
	this.DebugMessageFunction();
	if (!target) {
		target = "#results";
	}
	let element = document.querySelector("#results");
	if (!element) {
		console.error("ERROR: Cannot find", target);
		return;
	}

	if (!results) {
		results = this.VARS.SEARCH_RESULTS;
	}

	if (!results) {
		element.innerHTML = "";
		return;
	}

	if (results.length == 0) {
		element.innerHTML = "";
		return;
	}

	let lyricsSearch = false;
	let lyricsSearchText = "";
	let lyricsElement = document.querySelector("#filter-lyrics input.filter.lyrics");
	if (lyricsElement) {
		let value = lyricsElement.value.trim();
		// don't show single-letter matches since there will be
		// too many of them, and the results will not be very useful.
		// So at least two characters are required in the lyrics search
		// box before matches in lyrics words will be displayed (but you
		// could search for two single letters, in which case single letter
		// matches are currently allowed.
		if (value && (value.length > 1) && !value.match(/^[\s-]*$/)) {
			lyricsSearch = true;
			lyricsSearchText = value;
		}
	}

	let output = "";
	output += "<table class='search-results'>\n";
	output += "<thead>\n";
	output += `<th class="shelfmark">${this.getTranslation("header_shelfmark")}</th>\n`;
	output += `<th class="composer">${this.getTranslation("header_composer")}</th>\n`;
	output += `<th class="title">${this.getTranslation("header_title")}</th>\n`;
	output += "</thead>\n";
	output += "<tbody>\n";

	for (let i=0; i<results.length; i++) {

		let composer = results[i].COM || "";
		let matches = composer.match(/^\s*([^,]+),\s*(.*)\s*$/);
		if (matches) {
			composer = `${matches[1]}<span class='first-name'>, ${matches[2]}</span`;
		} else {
			if ((composer === "Anonim") || (composer === "anonim")) {
				composer = this.getTranslation("Anonymus");
			}
		}
		let siglum = results[i].siglum || "";
		let shelfmark = results[i].shelfmark || "";
		let cenid = results[i].cenid || "";

		output += `<tr data-id='${cenid}'>\n`;
		output += "<td class='shelfmark'>";
		output += this.getShelfmarkContent(siglum, shelfmark);
		output += "</td>\n";
		output += "<td class='composer'>";
		output += composer;
		output += "</td>\n";
		output += "<td class='title'>";
		output += this.getHighlightedString(results[i].title || "", this.VARS.SEARCH.title);
		output += "</td>\n";
		output += "</tr>\n";

		if (lyricsSearch) {
			output += this.printLyricsSearchResults(results[i]._lyrics, lyricsSearchText, 3);
		}
	}

	output += "</tbody>\n";
	output += "</table>\n";

	element.innerHTML = output;
	if (this.VARS.BROWSE_STYLE === "less") {
		this.hideShelfmarkColumn();
	} else {
		this.showShelfmarkColumn();
	}
};

Object.defineProperty(POPC2.prototype.displayBrowseTable, "name", { value: "displayBrowseTable" });



