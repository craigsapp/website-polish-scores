{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 12:40:31 PDT 2021
// Last Modified: Fri Oct 15 12:40:33 PDT 2021
// Filename:      _includes/work/toggleDownloadDisplay.js
// Used by:       _includes/navigator/work-toolbar.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-score and musical incipit views.
//
{% endcomment %}

POPC2.prototype.toggleDownloadDisplay = function () {
	this.DebugMessageFunction();

	// Hide Search form display if visible.

	let element = document.querySelector("#subpage-downloads");
	let icon = document.querySelector("#download-button");
	if (!element) {
		return;
	}
	let showing = (element.style.display !== "none");
	if (showing) {
		element.style.display = "none";
		if (icon) {
			icon.classList.remove("selected");
		}
	} else {
		element.style.display = "flex";
		if (icon) {
			icon.classList.add("selected");
		}
		// Scroll to the download box if it is not on the page.
		let elementY = element.getBoundingClientRect().top;
		// 50 is about the height of the work toolbar.
		if (elementY < 50) {
			this.scrollToTopOfNotation();
		}
	}
		
};

Object.defineProperty(POPC2.prototype.toggleDownloadDisplay, "name", { value: "toggleDownloadDisplay" });



