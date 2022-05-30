{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 12:40:31 PDT 2021
// Last Modified: Sun Jan 23 07:00:14 PST 2022
// Filename:      _includes/work/toggleToolDisplay.js
// Used by:       _includes/navigator/toolbar-work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle workpage submenus.
//
{% endcomment %}

POPC2.prototype.toggleToolDisplay = function (type) {
	this.DebugMessageFunction(type);
	let target = `tool-${type}`;
	let subpages = document.querySelectorAll("[id^='tool-']");
	let workinfo;
	let showWorkInfo = false;
	for (let i=0; i<subpages.length; i++) {
		let id = subpages[i].id;
		let matches = id.match(/^tool-(.*)\s*/);
		if (!matches) {
			continue;
		}
		let idtype = matches[1];
		if (idtype === "workinfo") {
			workinfo = subpages[i];
		}
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
			this.scrollToTopForTool();
		} else {
			showWorkInfo = true;
			subpages[i].classList.add("hidden");
			if (icon) {
				icon.classList.remove("selected");
			}
		}
		if (hidden && (type === "keyscape")) {
			// (hidden now will be not hidden)
			this.showKeyscape();
		}
	}
	if (showWorkInfo && workinfo) {
		workinfo.classList.remove("hidden");
	}

	this.updateWorkUrlDisplay();

};

Object.defineProperty(POPC2.prototype.toggleToolDisplay, "name", { value: "toggleToolDisplay" });



