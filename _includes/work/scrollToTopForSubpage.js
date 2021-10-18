{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 18 12:12:54 PDT 2021
// Last Modified: Mon Oct 18 12:12:57 PDT 2021
// Filename:      _includes/work/scrollToTopForSubpage.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-screen and regular view.
//
{% endcomment %}

POPC2.prototype.scrollToTopForSubpage = function () {
	this.DebugMessageFunction();
	let content = document.querySelector("#content");
	if (!content) {
		console.error("Error: cannot find #content");
		return;
	}
	let adjustment = -50;
	let elementY = content.getBoundingClientRect().top;
	let targetY = elementY + window.pageYOffset + adjustment;
	if (elementY < 50) {
		window.scrollTo({top: targetY, behavior: "smooth"});
	}
};

Object.defineProperty(POPC2.prototype.scrollToTopForSubpage, "name", { value: "scrollToTopForSubpage" });



