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
// currently not used (or no longer used?)
return;

	let element = document.querySelector("#moreless-button");
	if (!element) {
		console.error("Error: cannot find more/less button");
		return;
	}

	let buttonTitleTag = `button_${tag}_help`;
	let buttonTitle    = this.getTranslation(buttonTitleTag);

	if (tag.match(/more/i)) {
		element.classList.remove("fa-compress-arrows-alt");
		element.classList.add("fa-expand-arrows-alt");
	} else {
		element.classList.add("fa-compress-arrows-alt");
		element.classList.remove("fa-expand-arrows-alt");
	}
	element.title     = buttonTitle;
};

Object.defineProperty(POPC2.prototype.setMoreLessBrowseLanguage, "name", { value: "setMoreLessBrowseLanguage" });



