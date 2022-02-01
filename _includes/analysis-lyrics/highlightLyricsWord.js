{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Jan 31 22:12:20 PST 2022
// Last Modified: Mon Jan 31 22:12:23 PST 2022
// Filename:      _includes/analysis-lyrics/highlightLyricsWord.js
// Used by:
// Included in:   _includes/analysis-lyrics/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Highlight a lyrics analysis word (called by mouseover event on lyircs table).
//
{% endcomment %}

POPC2.prototype.highlightLyricsWord = function (word) {
	this.DebugMessageFunctionVerbose();

	let list = this.VARS.WORDLIST[word];
	if (!list) {
		return;
	}
	for (let i=0; i<list.length; i++) {
		list[i].style.color = "red";
	}
}

Object.defineProperty(POPC2.prototype.highlightLyricsWord, "name", { value: "highlightLyricsWord" });



