{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/setMoreLessBrowseLanguage.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Initializations for the browse page.
//
{% endcomment %}

POPC2.prototype.setMoreLessBrowseLanguage = function (tag) {
	this.DebugMessageFunction();

	let element = document.querySelector("#filter-moreless");
	if (!element) {
		console.error("Error: cannot find more/less button");
		return;
	}

	let buttonTextTag  = `button_${tag}`;
	let buttonTitleTag = `button_${tag}_help`;
	let buttonText     = this.getTranslation(buttonTextTag);
	let buttonTitle    = this.getTranslation(buttonTitleTag);

	element.innerHTML = buttonText;
	element.title     = buttonTitle;
};

Object.defineProperty(POPC2.prototype.setMoreLessBrowseLanguage, "name", { value: "setMoreLessBrowseLanguage" });



