{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildSiglumFilter.js
// Used by:       _incuode/browse/doBrowseSearch();
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for sigla.  This is done
//                by searching through the browse index (or any
//                provided index) and collating the siglum fields
//                for each entry in the index.  The sigla list also
//                gives the number of entries in the full index in
//                the siglum search list in parentheses after siglum
//                abbreviation.
//
{% endcomment %}

POPC2.prototype.buildSiglumFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SCORE_INDEX;
	}
	if (!target) {
		target = "#filter-siglum";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating siglum filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}

	let sigla = {};
	if (index.length === this.VARS.SCORE_INDEX.length) {
			// Use cached sigla counts
			sigla = this.VARS.BROWSE_MENU_OPTIONS.siglum;
	} else {
		for (let i=0; i<index.length; i++) {
			let siglum = index[i].siglum;
			if (!siglum) {
				continue;
			}
			siglum = siglum.trim();

			if (!sigla[siglum]) {
				sigla[siglum] = 1;
			} else {
				sigla[siglum]++;
			}
		}
	}

	let limitedKeys = Object.getOwnPropertyNames(sigla);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.siglum);

	fullKeys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedSiglum = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.siglum) {
		selectedSiglum = this.VARS.SEARCH.siglum;
	}

	let output = "<select class='filter siglum'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_library");
	output += ` [${limitedKeys.length}]`;
	output += "</option>\n";

	for (let i=0; i<fullKeys.length; i++) {
		output += '<option value="';
		let siglum = fullKeys[i];
		let displaySiglum = siglum;
		output += siglum.replace(/"/g, '\\"');
		output += '"'
		if (selectedSiglum === siglum) {
			output += " selected";
		}
		output += '>';
		output += displaySiglum;
		if (sigla[siglum]) {
			output += ` (${sigla[siglum]})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildSiglumFilter, "name", { value: "buildSiglumFilter" });


