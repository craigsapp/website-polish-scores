{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 18 12:12:54 PDT 2021
// Last Modified: Thu Jun  2 03:14:31 PDT 2022
// Filename:      _includes/work/scrollToTopForTool.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-screen and regular view.  This function
//                is no longer used (tool panel will overlay the notation instead).
//
{% endcomment %}

POPC2.prototype.scrollToTopForTool = function () {
	this.DebugMessageFunction();
	let content = document.querySelector("#content");
	if (!content) {
		console.error("Error: cannot find #content");
		return;
	}
	let adjustment = -parseInt("{{ site.toolbar_height }}");
	let elementY = content.getBoundingClientRect().top;
	let targetY = elementY + window.pageYOffset + adjustment;
	if (elementY < parseInt("{{site.toolbar_height}}")) {
		window.scrollTo({top: targetY, behavior: "smooth"});
	}
};

Object.defineProperty(POPC2.prototype.scrollToTopForTool, "name", { value: "scrollToTopForTool" });



