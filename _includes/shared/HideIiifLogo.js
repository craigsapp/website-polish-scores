{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Apr  4 19:04:04 PDT 2022
// Last Modified: Mon Apr  4 19:04:08 PDT 2022
// Filename:      _includes/shared/HideIiifLogo.js
// Used by:       _includes/work/displayBrowsePage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show/hide IIIF logo for work pages that have IIIF markup.
//
{% endcomment %}

POPC2.prototype.HideIiifLogo = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#iiif-logo");
	if (element) {
		element.classList.remove("enabled");
	}
};

Object.defineProperty(POPC2.prototype.HideIiifLogo, "name", { value: "HideIiifLogo" });



