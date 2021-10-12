{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/printHighlightLyric.js
// Used By:       _includes/browse/printLyricsSearchResults.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Returns empty string if there was no match.
//
{% endcomment %}

POPC2.prototype.printHighlightedLyric = function (word, query) {
	this.DebugMessageFunctionVerbose();
	let newword = this.getHighlightedString(word, query);
	if (newword === word) {
		// No match so return empty string
		return "";
	}
	let output = "";
	output += "<span class='lyric-word'>";
	output += newword;
	output += "</span>";
	return output;
};

Object.defineProperty(POPC2.prototype.printHighlightedLyric, "name", { value: "printHighlightedLyric" });



