{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/printLyricsSearchResults.js
// Used by:       _includes/browse/displayBrowseTable.js
// Used by:       _includes/browse/printHighlightedLyric.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Print a list of all matching lyrics words.
//
{% endcomment %}

POPC2.prototype.printLyricsSearchResults = function (lyrics, query, columns) {
	this.DebugMessageFunction();
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
	// Placing lyrics matches in last column:
	output += `<td colspan="${columns}">\n`;
	output += "<div class='lyrics-match'>\n";

	for (let i=0; i<lyricsList.length; i++) {
		let entry = lyricsList[i];
		let hiword = this.printHighlightedLyric(entry.word, query);
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
};

Object.defineProperty(POPC2.prototype.printLyricsSearchResults, "name", { value: "printLyricsSearchResults" });



