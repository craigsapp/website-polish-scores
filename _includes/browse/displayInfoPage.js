{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 17 22:34:06 PDT 2022
// Last Modified: Mon Oct 17 22:34:09 PDT 2022
// Filename:      _includes/browse/displayInfoPage.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the given info page
//
{% endcomment %}

POPC2.prototype.displayInfoPage = function (infopage) {
	this.DebugMessageFunction();
	if (!infopage) {
		infopage = "/info";
	} else {
		infopage = `/info/${infopage}`;
	}
	infopage = infopage.replace("/+", "/", "g");
	infopage = infopage.replace("^/info/info/", "/info/");

	// Open in the "info" tab/window:
	window.open(infopage, "info");

};

Object.defineProperty(POPC2.prototype.displayInfoPage, "name", { value: "displayInfoPage" });



