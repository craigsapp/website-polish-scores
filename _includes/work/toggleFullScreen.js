{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 13 00:38:18 PDT 2021
// Last Modified: Wed Oct 13 00:38:21 PDT 2021
// Filename:      _includes/work/toggleFullScreen.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-screen and regular view.
//
{% endcomment %}

POPC2.prototype.toggleFullScreen = function () {
	this.DebugMessageFunction();

	let element = document.querySelector("#fullwidth-button");
	if (!element) {
		console.warn("Error: Cannot find #fullwidth-button");
		return;
	}
	let content = document.querySelector("#content");
	if (!content) {
		console.error("Erro: cannot find #content");
		return;
	}
	let fullwidth = content.classList.contains("fullwidth");
	if (fullwidth) {
		content.classList.remove("fullwidth");
		element.classList.remove("fa-compress");
		element.classList.add("fa-expand");
		element.dataset.transatt = "title:fullwidth_tool_expand";
	} else {
		content.classList.add("fullwidth");
		element.classList.remove("fa-expand");
		element.classList.add("fa-compress");
		element.dataset.transatt = "title:fullwidth_tool_compress";
	}
	this.ApplyElementTranslations();

	// Go to top of notation sine the layout as changed.
	// Otherwise as a later refinement, check for the first
	// measure visible on the screen and move to that measure
	// when redoing the layout.
	this.scrollToTopOfNotation();
};

Object.defineProperty(POPC2.prototype.toggleFullScreen, "name", { value: "toggleFullScreen" });



