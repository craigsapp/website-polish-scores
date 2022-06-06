{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Jun  5 05:40:54 PDT 2022
// Last Modified: Sun Jun  5 05:40:57 PDT 2022
// Filename:      _includes/timemap/insertElementsIntoTimemap.js
// Used by:       
// Included in:   _includes/timemap/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Insert SVG note elements into timemap in eon and eoff arrays.
//
{% endcomment %}

POPC2.prototype.insertElementsIntoTimemap = function(timemap, selector) {
	this.DebugMessageFunction();
	if (!timemap) {
		timemap = this.TIMEMAP;
		if (typeof timemap === "undefined") {
			return;
		}
	}
	if (!selector) {
		selector = "#notation svg";
	}
	let svg = document.querySelector(selector);
	if (!svg) {
		return;
	}

	let notes = document.querySelectorAll("svg [id^='note-']");
	let lookup = [];
	for (let i=0; i<notes.length; i++) {
		let element = notes[i];
		let id = element.id;
		let matches = id.match(/L(\d+)/);
		if (!matches) {
			continue;
		}
		let line = parseInt(matches[1]);
		if (typeof lookup[line] === "undefined") {
			lookup[line] = {};
		}
		lookup[line][id] = element;
	}

	for (let i=0; i<timemap.length; i++) {
		entry = timemap[i];
		let offids = {};

		if (typeof entry.off !== "undefined") {
			entry.eoff = [];
			for (let j=0; j<entry.off.length; j++) {
				let id = entry.off[j];
				offids[id] = 1;
				let matches = id.match(/L(\d+)/);
				if (!matches) {
					continue;
				}
				let line = parseInt(matches[1]);
				if (typeof lookup[line] === "undefined") {
					continue;
				}
				let element = lookup[line][id];
				if (typeof element === "undefined") {
					continue;
				}
				entry.eoff.push(element);
			}
		}

		if (typeof entry.on !== "undefined") {
			entry.eon = [];
			for (let j=0; j<entry.on.length; j++) {
				let id = entry.on[j];
				if (offids[id]) {
					// do not store note ons for grace notes
					continue;
				}
				let matches = id.match(/L(\d+)/);
				if (!matches) {
					continue;
				}
				let line = parseInt(matches[1]);
				if (typeof lookup[line] === "undefined") {
					continue;
				}
				let element = lookup[line][id];
				if (typeof element === "undefined") {
					continue;
				}
				entry.eon.push(element);
			}
		}

	}

};

Object.defineProperty(POPC2.prototype.insertElementsIntoTimemap, "name", { value: "insertElementsIntoTimemap" });



