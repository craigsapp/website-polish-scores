{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 06:41:12 PDT 2021
// Last Modified: Tue Oct 19 06:41:15 PDT 2021
// Filename:      _includes/work/toggleComposerInfoDisplay.js
// Used by:       _includes/work/work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle display of composer info (under composer's name)
//
{% endcomment %}

POPC2.prototype.toggleComposerInfoDisplay = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#composer-info");
	if (!element) {
		return;
	}

	let e2 = document.querySelector("#composer .composer-info");

	if (element.classList.contains("hidden")) {
		element.classList.remove("hidden");
		if (e2) {
			e2.classList.add("open");
		}
	} else {
		element.classList.add("hidden");
		if (e2) {
			e2.classList.remove("open");
		}
	}
};

Object.defineProperty(POPC2.prototype.toggleComposerInfoDisplay, "name", { value: "toggleComposerInfoDisplay" });



