{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Apr  4 19:01:23 PDT 2022
// Last Modified: Mon Apr  4 19:01:26 PDT 2022
// Filename:      _includes/shared/ShowIiifLogo.js
// Used by:       _includes/work/displayBrowsePage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show/hide IIIF logo for work pages that have IIIF markup.
//
{% endcomment %}

POPC2.prototype.ShowIiifLogo = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#iiif-logo");
	if (element) {
		element.classList.add("enabled");
	}
};

Object.defineProperty(POPC2.prototype.ShowIiifLogo, "name", { value: "ShowIiifLogo" });



