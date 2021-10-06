//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/browse-table.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions related to displaying worklist on the browse page.
//


//////////////////////////////
//
// displayBrowseTable -- Display a list of works on the browse
//     page.   The last search results on the browse page,
//     stored in GLOBAL.BROWSE_RESULTS will be used to display
//     the list if no list is given as input to this function.
//

function displayBrowseTable(results, target) {
	if (!target) {
		target = "#results";
	}
	let element = document.querySelector("#results");
	if (!element) {
		console.error("ERROR: Cannot find", target);
		return;
	}

	if (!results) {
		results = GLOBAL.BROWSE_RESULTS;
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
	output += `<th class="shelfmark">${getTranslation("header_shelfmark")}</th>\n`;
	output += `<th class="composer">${getTranslation("header_composer")}</th>\n`;
	output += `<th class="title">${getTranslation("header_title")}</th>\n`;
	output += "</thead>\n";
	output += "<tbody>\n";

	for (let i=0; i<results.length; i++) {

		let composer = results[i].COM || "";
		let matches = composer.match(/^\s*([^,]+),\s*(.*)\s*$/);
		if (matches) {
			composer = `${matches[1]}<span class='first-name'>, ${matches[2]}</span`;
		} else {
			if ((composer === "Anonim") || (composer === "anonim")) {
				composer = getTranslation("Anonymus");
			}
		}
		let siglum = results[i].siglum || "";
		let shelfmark = results[i].shelfmark || "";

		output += "<tr data-id='xxx'>\n";
		output += "<td class='shelfmark'>";
		output += getShelfmarkContent(siglum, shelfmark);
		output += "</td>\n";
		output += "<td class='composer'>";
		output += composer;
		output += "</td>\n";
		output += "<td class='title'>";
		output += getHighlightedString(results[i].title || "", GLOBAL.SEARCH.title);
		output += "</td>\n";
		output += "</tr>\n";

		if (lyricsSearch) {
			output += printLyricsSearchResults(results[i].lyrics, lyricsSearchText, 3);
		}
	}

	output += "</tbody>\n";
	output += "</table>\n";

	element.innerHTML = output;
}



//////////////////////////////
//
// printLyricsSearchResults -- print a list of all of the matching
//    lyrics words.
//

function printLyricsSearchResults(lyrics, query, columns) {
	if (!lyrics) {
		return "";
	}
	var entries = lyrics.split(/\t+/);
	var lyricsList = [];
	for (let i=0; i<entries.length; i++) {
		let item = {};
		let matches = entries[i].match(/^(\d+)\s+(.*)$/);
		if (matches) {
			item.count = matches[1];
			item.word = matches[2];
		}
		lyricsList.push(item);
	}
	if (lyricsList.length == 0) {
		return "";
	}

	let output = "";
	output += "<tr class='lyrics' data-fileid='xxx'>\n";
	// placing lyrics matches in last column
	output += `<td colspan="${columns}">\n`;
	output += "<div class='lyrics-match'>\n";

	for (let i=0; i<lyricsList.length; i++) {
		let entry = lyricsList[i];
		let hiword = printHighlightedLyric(entry.word, query);
		if (!hiword) {
			continue;
		}
		output += "<span class='lyric-entry'>\n";
		output += `<span class='lyric-count'>${entry.count}</span>\n`;
		output += hiword;
		output += "</span>\n";
	}

	output += "</span>";
	output += "</td>";
	output += "</tr>";
	return output;
}



//////////////////////////////
//
// printHighlightedLyric -- Returns empty string when there was
//     no match.
//

function printHighlightedLyric(word, query) {
	let newword = getHighlightedString(word, query);
	if (newword === word) {
		// No match so return empty string
		return "";
	}
	let output = "";
	output += "<span class='lyric-word'>";
	output += newword;
	output += "</span>";
	return output;
}



//////////////////////////////
//
// getHighlightedString -- Return the input stirng, highlighting
//    any matches from the query string as HTML markup.
//

function getHighlightedString(contents, query) {
	if (!query) {
		return contents;
	}

	let target = query.trim();
	let pieces = target.split(/\s*"+\s*/);
	let titleTargets = [];
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = pieces[i].trim();
		if (i % 2 == 0) {
			let newpieces = pieces[i].split(/\s+/);
			for (let j=0; j<newpieces.length; j++) {
				if (newpieces[j]) {
					titleTargets.push(newpieces[j]);
				}
			}
		} else {
			// Exact phrase to search for:
			if (pieces[i]) {
				titleTargets.push(pieces[i]);
			}
		}
	}

	if (titleTargets.length == 0) {
		return contents;
	}

	for (let i=0; i<titleTargets.length; i++) {
		let re = new RegExp(titleTargets[i], "gi");
		contents = contents.replace(re, (match) => `<#>${match}</#>`);
	}
	contents = contents.replace(/#/g, "span");
	contents = contents.replace(/<span>/g, "<span class='mark'>");

	return contents;
}



//////////////////////////////
//
// getShelfmarkContent -- Create HTML markup for "siglum: shelfmark"
//    to display in the browse table.
//

function getShelfmarkContent(siglum, shelfmark) {
	let lowshelf = siglum.toLowerCase();
	let output = "";
	output += "<span"
	output += ` title="${getTranslation(lowshelf)}"`;
	output += " class='siglum'>";
	output += `${siglum}`;
	output += "</span>";
	output += `<span class='siglum-postfix'>: `;
	output += `<span class='shelfmark'>${shelfmark}</span>`;
	return output;
}



