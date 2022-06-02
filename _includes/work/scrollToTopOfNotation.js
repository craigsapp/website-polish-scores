{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 13 00:38:18 PDT 2021
// Last Modified: Wed Oct 13 00:38:21 PDT 2021
// Filename:      _includes/work/scrollToTopOfNotation.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-screen and regular view.
//
{% endcomment %}

POPC2.prototype.scrollToTopOfNotation = function () {
	this.DebugMessageFunction();
	let content = document.querySelector("#content");
	if (!content) {
		console.error("Error: cannot find #content");
		return;
	}
	let adjustment = -parseInt("{{ site.toolbar_height }}");
	let elementY = content.getBoundingClientRect().top;
	let targetY = elementY + window.pageYOffset + adjustment;
	window.scrollTo({top: targetY, behavior: "smooth"});
};

Object.defineProperty(POPC2.prototype.scrollToTopOfNotation, "name", { value: "scrollToTopOfNotation" });



