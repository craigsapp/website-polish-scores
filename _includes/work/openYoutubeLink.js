{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Apr  4 11:01:02 PDT 2025
// Last Modified: Fri Apr  4 11:01:06 PDT 2025
// Filename:      _includes/scripts/main/openYoutubeLink.js
// Included in:   _includes/scripts/main.js
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   Open a window for a youtube lkink.
//
{% endcomment %}

POPC2.prototype.openYoutubeLink = function (url) {
	this.DebugMessageFunction(url);

	window.open(url, 'youtube');
}

Object.defineProperty(POPC2.prototype.openYoutubeLink, "name", { value: "openYoutubeLink" });



