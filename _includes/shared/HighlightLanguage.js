{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 01:30:46 PDT 2021
// Last Modified: Fri Oct  8 01:30:49 PDT 2021
// Filename:      _includes/shared/HighlightLanguage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Highlights the requested language in the navigator that
//                is immediatly above the main content of the webpage.
//
{% endcomment %}

POPC2.prototype.HighlightLanguage = function (lang) {
	this.DebugMessageFunction(lang);
	if (!this.IsValidLanguage(lang)) {
		return;
	}
	let links = document.querySelectorAll("#language-list .button-language");
	for (let i=0; i<links.length; i++) {
		let text = links[i].textContent;
		if (text === lang) {
			links[i].classList.add("highlight");
		} else {
			links[i].classList.remove("highlight");
		}
	}
};



