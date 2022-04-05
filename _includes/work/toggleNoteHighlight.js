{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Apr  3 19:27:26 PDT 2022
// Last Modified: Sun Apr  3 19:27:29 PDT 2022
// Filename:      _includes/work/toggleNoteHighlight.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Select/unselect a note in the SVG image.
//
{% endcomment %}

POPC2.prototype.toggleNoteHighlight = function (path) {
	this.DebugMessageFunction();

	if (!path) {
		return;
	}
	let svgelement = null;
	let id = "";
	let target = "";
	for (let i=0; i<path.length; i++) {
		let element = path[i];
		if (element.nodeName === "svg") {
			svgelement = element;
			break;
		}
		if (element.nodeName !== "g") {
			continue;
		}
		let testid = element.id;
		let matches = testid.match(/-L\d/)
		if (matches) {
			matches = testid.match(/(rest|note)/);
			if (matches) {
				if (!id) {
					id = testid;
					target = element;
				}
			}
		}
	}
	if (!svgelement) {
		return;
	}
	if (!id) {
		return;
	}
	let highlight = target.classList.contains("highlight");
	if (highlight) {
		if (this.VARS.CURSOR_NOTE) {
			this.VARS.CURSOR_NOTE.classList.remove("highlight");
		}
		if (target != this.VARS.CURSOR_NOTE) {
			target.classList.remove("highlight");
		}
		this.VARS.CURSOR_NOTE = null;
	} else {
		// turn off previous cursor note first
		if (this.VARS.CURSOR_NOTE) {
			this.VARS.CURSOR_NOTE.classList.remove("highlight");
		}
		this.VARS.CURSOR_NOTE = target;
		target.classList.add("highlight");
	}
};

Object.defineProperty(POPC2.prototype.toggleNoteHighlight, "name", { value: "toggleNoteHighlight" });



