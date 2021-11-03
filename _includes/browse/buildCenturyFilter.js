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
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
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
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached century counts
			centuries = this.VARS.BROWSE_MENU_OPTIONS.century;
	} else {
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
	}

	let limitedKeys = Object.getOwnPropertyNames(centuries);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.century);

	let partial = limitedKeys.length != fullKeys.length;

	fullKeys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedCentury = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.century) {
		selectedCentury = this.VARS.SEARCH.century;
	}

	let output = "<select class='filter century'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_century");
	output += ` [${limitedKeys.length}]`;
	output += "</option>\n";

	for (let i=0; i<fullKeys.length; i++) {
		let century = fullKeys[i];
		let displayCentury = century;
		output += '<option';
		if (partial && centuries[century]) {
			output += ' class="highlight"';
		}
		output += ' value="';
		output += century.replace(/"/g, '\\"');
		output += '"'
		if (selectedCentury === century) {
			output += " selected";
		}
		output += '>';
		output += displayCentury;
		if (centuries[century]) {
			output += ` (${centuries[century]})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildCenturyFilter, "name", { value: "buildCenturyFilter" });



