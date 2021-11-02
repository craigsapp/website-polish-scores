{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Sat Oct 30 11:45:08 PDT 2021
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

	results = this.sortIndex(results);
	let sortByDate = (this.VARS.SEARCH_SORT_TYPE === "lastedit");

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

	let sortMethod = this.VARS.SEARCH_SORT_TYPE;

	let output = "";
	output += "<table class='search-results'>\n";
	output += "<thead>\n";

	if (sortByDate) {
		output += `<th class="date sorted">${this.getTranslation("last_edited")}</th>\n`;
	} else {
		output += `<th class="date hidden">${this.getTranslation("last_edited")}</th>\n`;
	}

	output += '<th class="shelfmark';
	if (sortMethod === "shelfmark") {
		output += " sorted";
	}
	output += '" onclick="popc2.toggleShelfmarkSort()">';
	output += this.getTranslation("header_shelfmark");
 	output += "</th>\n";

	output += `<th class="composer`;
	if (sortMethod === "composer") {
		output += " sorted";
	}
	output += `" onclick="popc2.toggleComposerSort()">${this.getTranslation("header_composer")}</th>\n`;

	output += `<th class="title`;
	if (sortMethod === "title") {
		output += " sorted";
	}
	output += `" onclick="popc2.toggleTitleSort()">${this.getTranslation("header_title")}</th>\n`;

	output += "</thead>\n";
	output += "<tbody>\n";

	let lastedit = -1;
	let lastlastedit = -1;
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
		let lastedit = results[i].lastedit || 0;

		output += `<tr data-id='${cenid}'>\n`;

		if (sortByDate) {
			output += "<td class='date'>";
		} else {
			output += "<td class='date hidden'>";
		}
		if (lastedit != lastlastedit) {
			output += this.GetDateFromInteger(lastedit);
			lastlastedit = lastedit
		}
		output += "</td>\n";

		output += "<td class='shelfmark'>";
		output += this.getShelfmarkContent(siglum, shelfmark);
		output += "</td>\n";

		output += "<td class='composer'>";
		output += composer;
		output += "</td>\n";

		output += "<td class='title'>";
		if (this.VARS.SEARCH_SORT_TYPE === "title") {
			let gtl = results[i].GTL || "";
			let opr = results[i].OPR || "";
			let otl = results[i].OTL || "";
			let unsorttitle = "";
			let sorttitle = "";
			if (gtl) {
				unsorttitle = gtl;
				sorttitle = otl;
				if (sorttitle === "[post correcturam]") {
					sorttitle = "[post&nbsp;correcturam]";
				}
				if (sorttitle === "[pre correcturam]") {
					sorttitle = "[pre&nbsp;correcturam]";
				}
				output += "<span class='mute'>";
				output += this.getHighlightedString(unsorttitle, this.VARS.SEARCH.title);
				output += " &mdash; ";
				output += "</span>";
				output += this.getHighlightedString(sorttitle, this.VARS.SEARCH.title);
			} else if (opr) {
				sorttitle = opr;
				unsorttitle = otl;
				if (sorttitle === "[post correcturam]") {
					sorttitle = "[post&nbsp;correcturam]";
				}
				if (sorttitle === "[pre correcturam]") {
					sorttitle = "[pre&nbsp;correcturam]";
				}
				output += this.getHighlightedString(sorttitle, this.VARS.SEARCH.title);
				output += "<span class='mute'>";
				output += " &mdash; ";
				output += this.getHighlightedString(unsorttitle, this.VARS.SEARCH.title);
				output += "</span>";
			} else {
				sorttitle = otl;
				unsorttitle = "";
				if (sorttitle === "[post correcturam]") {
					sorttitle = "[post&nbsp;correcturam]";
				}
				if (sorttitle === "[pre correcturam]") {
					sorttitle = "[pre&nbsp;correcturam]";
				}
				output += this.getHighlightedString(sorttitle, this.VARS.SEARCH.title);
			}
		} else {
			let title = results[i]._title || "";
			if (title === "[post correcturam]") {
				title = "[post&nbsp;correcturam]";
			}
			if (title === "[pre correcturam]") {
				title = "[pre&nbsp;correcturam]";
			}
			output += this.getHighlightedString(results[i]._title || "", this.VARS.SEARCH.title);
		}
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

	// Dynamically change the font size based on the length of the search results table:
	let height = element.offsetHeight;
	console.warn("HEIGHT OF TABLE IS", height);
	let zoom = 1.25 - (1.0/400000.0) * height;
	if (zoom < 0.90) {
		zoom = 0.90;
	}
	element.style.zoom = zoom;

};

Object.defineProperty(POPC2.prototype.displayBrowseTable, "name", { value: "displayBrowseTable" });



