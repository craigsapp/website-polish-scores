//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filter-lyrics.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for creating the lyris search box in the browse search form.
//


//////////////////////////////
//
// buildLyricsFilter -- Create the search entry for lyrics.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the unique lyrics in the COM field for each entry in the index.  The
//    lyric list also lists the number of entries in the full index in the
//    lyric search list in parentheses after the lyric's name.
//

function buildLyricsFilter(target) {
	if (!target) {
		target = "#filter-lyrics";
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let ielement = element.querySelector("input");
	let lastLyrics = "";
	if (ielement) {
		lastLyrics = ielement.value;
	}

	let selectedLyrics = "";
	if (GLOBAL.SEARCH && GLOBAL.SEARCH.lyrics) {
		selectedLyrics = GLOBAL.SEARCH.lyrics;
	}
	if (lastLyrics) {
		selectedLyrics = lastLyrics;
	}

	let output = "<input type='text' class='filter lyrics'";
	output += ` placeholder='${getTranslation("lyrics_placeholder")}'`;
	output += ` value="${selectedLyrics}"`;
	output += ">\n";

	element.innerHTML = output;
	element.onkeyup = function() { filterBrowseIndex(); };
}



