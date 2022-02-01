{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Jan 31 22:40:13 PST 2022
// Last Modified: Mon Jan 31 22:40:16 PST 2022
// Filename:      _includes/analysis-lyrics/unhighlightLyricsWord.js
// Used by:
// Included in:   _includes/analysis-lyrics/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Unhighlight a lyrics analysis word (called by mouseover event on lyircs table).
//
{% endcomment %}

POPC2.prototype.unhighlightLyricsWord = function (word) {
	this.DebugMessageFunctionVerbose();

	var list = this.VARS.WORDLIST[word];
	if (!list) {
		return;
	}
	for (var i=0; i<list.length; i++) {
		list[i].style.color = "";
	}
}

Object.defineProperty(POPC2.prototype.unhighlightLyricsWord, "name", { value: "unhighlightLyricsWord" });



