// vim: ts=3


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
	if (SEARCH && SEARCH.lyrics) {
		selectedLyrics = SEARCH.lyrics;
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



