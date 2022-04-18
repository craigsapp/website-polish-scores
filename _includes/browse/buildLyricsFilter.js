{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildLyricsFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for lyrics.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the unique
//                lyrics in the COM field for each entry in the
//                index.  The lyric list also lists the number of
//                entries in the full index in the lyric search
//                list in parentheses after the lyric's name.
//
{% endcomment %}

POPC2.prototype.buildLyricsFilter = function (target) {
	this.DebugMessageFunctionVerbose();
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
	if (this.VARS.SEARCH && this.VARS.SEARCH.lyrics) {
		selectedLyrics = this.VARS.SEARCH.lyrics;
	}
	if (lastLyrics) {
		selectedLyrics = lastLyrics;
	}

	if (!selectedLyrics.match(/^\s*$/)) {
		this.VARS.BROWSE_DELETE_HIGHLIGHT = true;
	}

	let output = "<input type='text' spellcheck='false' class='filter lyrics'";
	output += ` placeholder='${this.getTranslation("lyrics_placeholder")}'`;
	output += ` value="${selectedLyrics}"`;
	output += ">\n";

	element.innerHTML = output;
	let that = this;
	element.onkeyup = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildLyricsFilter, "name", { value: "buildLyricsFilter" });



