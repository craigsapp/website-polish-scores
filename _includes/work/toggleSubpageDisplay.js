{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 12:40:31 PDT 2021
// Last Modified: Mon Oct 18 11:35:43 PDT 2021
// Filename:      _includes/work/toggleSubpageDisplay.js
// Used by:       _includes/navigator/toolbar-work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle workpage submenus.
//
{% endcomment %}

POPC2.prototype.toggleSubpageDisplay = function (type) {
	this.DebugMessageFunction(type);
	let target = `subpage-${type}`;
	let subpages = document.querySelectorAll("[id^='subpage-']");
	for (let i=0; i<subpages.length; i++) {
		let id = subpages[i].id;
		let matches = id.match(/^subpage-(.*)\s*/);
		if (!matches) {
			continue;
		}
		let idtype = matches[1];
		let hidden = subpages[i].classList.contains("hidden");
		let icon = document.querySelector(`#${idtype}-button`);
		if (id != target) {
			if (!hidden) {
				subpages[i].classList.add("hidden");
				if (icon) {
					icon.classList.remove("selected");
				}
			}
			continue;
		}
		if (hidden) {
			subpages[i].classList.remove("hidden");
			if (icon) {
				icon.classList.add("selected");
			}
			this.scrollToTopForSubpage();
		} else {
			subpages[i].classList.add("hidden");
			if (icon) {
				icon.classList.remove("selected");
			}
		}
	}
};

Object.defineProperty(POPC2.prototype.toggleSubpageDisplay, "name", { value: "toggleSubpageDisplay" });


