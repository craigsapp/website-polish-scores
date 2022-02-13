{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildBrowseFilters.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Generate contents for all fields in browwe search form.
//
{% endcomment %}

POPC2.prototype.buildBrowseFilters = function (index) {
	this.DebugMessageFunction();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}

	let element = document.activeElement;
	let selector = element.nodeName.toLowerCase();
	if (selector === "input") {
		let parent = element.parentNode;
		if (parent.id) {
			selector = `#${parent.id} ${selector}`;
		}
		let classes = element.className.replace(/\s+/g, ".");
		if (classes) {
			selector += "." + classes;
		}
	} else {
		selector = null;
	}

	this.buildComposerFilter(index);
	this.buildCenturyFilter(index);
	this.buildSiglumFilter(index);
	this.buildGenreFilter(index);
	this.buildInstrumentFilter(index);
	this.buildNationalityFilter(index);
	this.buildTonicFilter(index);
	this.buildModeFilter(index);
	this.buildTitleFilter();
	this.buildLyricsFilter();
	this.buildPitchFilter();

	if (selector) {
		// Restore focus on the title/lyrics input:
		let newelement = document.querySelector(selector);
		if (newelement) {
			newelement.focus();
			// Force cursor to the end of the string (generalize later):
			// Currently it is not possible to move the cursor to the
			// middle or beginning of the text, but this can be fixed later by
			// saving the original cursor position and then restoring it here.
			if (typeof newelement.selectionStart == "number") {
				newelement.selectionStart = newelement.selectionEnd = newelement.value.length;
			} else if (typeof newelement.createTextRange != "undefined") {
				newelement.focus();
				var range = newelement.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
	}

};

Object.defineProperty(POPC2.prototype.buildBrowseFilters, "name", { value: "buildBrowseFilters" });



