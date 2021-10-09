{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/getHighlightedString.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Return the input stirng, highlighting any matches
//                from the query string as HTML markup.
//
{% endcomment %}

POPC2.prototype.getHighlightedString = function (contents, query) {
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
};



