{% comment %}
//
// Programmer:  Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Jan 24 11:09:39 PST 2022
// Last Modified: Mon Jan 24 11:09:41 PST 2022
// Filename:    _includes/browse/createIgnoreAccentsString.js
// Used by:     
// Included in: _includes/browse/main.html
// Syntax:      ECMAScript 6
// vim:         ts=3:nowrap
//
// Description: Create a query search string that ignore accent marks.
//              (NB: ignoring case should be handled separately.)
//
// See issue https://github.com/craigsapp/website-polish-scores/issues/97
// for how to list all characters present in lyrics.  This function is also
// used for searching titles, but titles were not checked for independent
// list of characters (presumed to be a subset of the one generated from lyrics).
//
{% endcomment %}

POPC2.prototype.createIgnoreAccentsString = function (input) {
	this.DebugMessageFunctionVerbose();
	let equivalence = {
		"a": "[aáàâäãāăąǎȃȧα]",
		"c": "[cçćĉčƈ]",
		"e": "[eéèêëēĕėęɛ]",
		"i": "[iîïİί]",
		"k": "[kť]",
		"l": "[lł]",
		"m": "[mḿ]",
		"n": "[nñń]",
		"o": "[oóóòôôöōŏőȯӧ]", // NB: the two o-umlauts are separate characters.
		"s": "[sśšſʃ]",
		"u": "[uúùûüūŭ]",
		"v": "[vν]",
		"w": "[wẃ]",
		"y": "[yýÿȳẏỳӱ]",  // NB: the two y-umlauts are separate characters.
		"z": "[zźżžƶʒʓӡᴣ]"
	};

	let output = "";
	for (let i=0; i<input.length; i++) {
		let character = input.charAt(i);
		let equal = equivalence[character.toLowerCase()];
		if (equal) {
			output += equal;
		} else {
			output += character;
		}
	}

	return output;
};

Object.defineProperty(POPC2.prototype.createIgnoreAccentsString, "name", { value: "createIgnoreAccentsString" });



