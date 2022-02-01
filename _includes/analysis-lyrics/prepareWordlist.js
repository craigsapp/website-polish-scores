{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Jan 31 22:12:20 PST 2022
// Last Modified: Mon Jan 31 22:12:23 PST 2022
// Filename:      _includes/analysis-lyrics/prepareWordlist.js
// Used by:
// Included in:   _includes/analysis-lyrics/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Read the list of words from the extracted lyrics table.
//
{% endcomment %}

POPC2.prototype.prepareWordlist = function () {
	this.DebugMessageFunctionVerbose();

	var words = document.querySelectorAll("table.lyrics span.word");
	this.VARS.WORDLIST = {};
	for (var i=0; i<words.length; i++) {
		word = words[i].innerHTML.toLowerCase();
		if (word.match(/^\s*$/)) {
			continue;
		}
		if (this.VARS.WORDLIST[word]) {
			this.VARS.WORDLIST[word].push(words[i]);
		} else {
			this.VARS.WORDLIST[word] = [];
			this.VARS.WORDLIST[word].push(words[i]);
		}
	}
}

Object.defineProperty(POPC2.prototype.prepareWordlist, "name", { value: "prepareWordlist" });



