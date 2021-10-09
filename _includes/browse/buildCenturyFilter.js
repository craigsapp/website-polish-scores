{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildCenturyFilter.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for centuries.  This is done
//                by searching through the browse index (or any
//                provided index) and collating the unique century
//                ID prefixes in the cenid field for each entry in
//                the index.  The century list also gives the number
//                of entries in the full index in the century search
//                list in parentheses after century's name.
//
{% endcomment %}

POPC2.prototype.buildCenturyFilter = function (index, target) {
	if (!index) {
		index = this.GLOBAL.BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-century";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating century filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let centuries = {};
	for (let i=0; i<index.length; i++) {
		let cenid = index[i].cenid;
		if (!cenid) {
			continue;
		}
		let matches = cenid.match(/^\s*(\d\dxx)\s*:/);
		if (!matches) {
			continue;
		}
		let tag = matches[1];

		if (!centuries[tag]) {
			centuries[tag] = 1;
		} else {
			centuries[tag]++;
		}
	}

	let keys = Object.getOwnPropertyNames(centuries);
	keys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedCentury = "";
	if (this.GLOBAL.SEARCH && this.GLOBAL.SEARCH.century) {
		selectedCentury = this.GLOBAL.SEARCH.century;
	}

	let output = "<select class='filter century'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_century");
	output += ` (${keys.length})`;
	output += "</option>\n";

	for (let i=0; i<keys.length; i++) {
		output += '<option value="';
		let century = keys[i];
		let displayCentury = century;
		output += century.replace(/"/g, '\\"');
		output += '"'
		if (selectedCentury === century) {
			output += " selected";
		}
		output += '>';
		output += displayCentury;
		output += " (";
		output += centuries[century];
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.filterBrowseIndex(); };
};



