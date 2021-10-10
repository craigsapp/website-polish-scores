{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Sat Oct  9 10:04:20 PDT 2021
// Filename:      _includes/browse/buildComposerFilter.js
// Used by:       _include/browse/buildBrowseFilters.js
// Used by:       _include/browse/filterBrowseIndex.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for composers.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the unique
//                composers in the COM field for each entry in the
//                index.  The composer list also lists the number
//                of entries in the full index in the composer
//                search list in parentheses after the composer's name.
{% endcomment %}

POPC2.prototype.buildComposerFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SCORE_INDEX;
	}
	if (!target) {
		target = "#filter-composer";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating composer filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let selement = element.querySelector("select");
	let lastComposer = "";
	if (selement) {
		lastComposer = selement.value;
	}

	let composers = {};
	for (let i=0; i<index.length; i++) {
		let com = index[i].COM;
		if (!composers[com]) {
			composers[com] = 1;
		} else {
			composers[com]++;
		}
	}

	let keys = Object.getOwnPropertyNames(composers);
	keys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedComposer = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.composer) {
		selectedComposer = this.VARS.SEARCH.composer;
	}
	if (lastComposer) {
		selectedComposer = lastComposer;
	}

	let output = "<select class='filter composer'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_composer");
	output += ` [${keys.length}]`;
	output += "</option>\n";

	for (let i=0; i<keys.length; i++) {
		output += '<option value="';
		let composer = keys[i];
		let displayComposer = composer;
		if ((displayComposer === "Anonim") || (displayComposer === "anonim")) {
			displayComposer = this.getTranslation("Anonymus");
		}
		if ((displayComposer === "Anonymus") || (displayComposer === "anonymus")) {
			displayComposer = this.getTranslation("Anonymus");
		}
		if ((displayComposer === "Anonymous") || (displayComposer === "anonymous")) {
			displayComposer = this.getTranslation("Anonymus");
		}
		output += composer.replace(/"/g, '\\"');
		output += '"'
		if (selectedComposer === composer) {
			output += " selected";
		}
		output += '>';
		output += displayComposer;
		output += " (";
		output += composers[composer];
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.filterBrowseIndex(); };
};

Object.defineProperty(POPC2.prototype.buildComposerFilter, "name", { value: "buildComposerFilter" });



