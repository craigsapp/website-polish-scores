{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 20:50:31 PDT 2021
// Last Modified: Tue Oct 12 20:50:34 PDT 2021
// Filename:      _includes/browse/showBrowseMore.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show more browse search fields.
//                Shows these queries/buttons:
//                   #filter-century
//                   #filter-siglum
//                   #filter-lyrics
//                   #filter-pitch
//                   #filter-tonic
//                   #filter-mode
//                   #filter-reset
//                   #filter-link
//                   #more-break
//                   #results-notecount
//
{% endcomment %}

POPC2.prototype.showBrowseMore = function () {
	this.DebugMessageFunctionVerbose();
	let element;
	element = document.querySelector("#filter-century");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-siglum");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-lyrics");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-pitch");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-tonic");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-mode");
	if (element) { element.style.display = "inline-block"; }
	// element = document.querySelector("#filter-reset");
	// if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#filter-link");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#results-notecount");
	if (element) { element.style.display = "inline-block"; }
	element = document.querySelector("#more-break");
	if (element) { element.style.display = "block"; }

	this.setMoreLessBrowseLanguage("less");

};

Object.defineProperty(POPC2.prototype.showBrowseMore, "name", { value: "showBrowseMore" });



