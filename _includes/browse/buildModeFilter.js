{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Feb  6 21:19:11 PST 2022
// Last Modified: Sun Feb  6 21:19:14 PST 2022
// Filename:      _includes/browse/buildModeFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for modes.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the key
//                fields for each entry in the index.  The modes
//                list also gives the number of entries in the
//                full index in the mode search list in parentheses
//                after mode name.
//
{% endcomment %}

POPC2.prototype.buildModeFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}
	if (!target) {
		target = "#filter-mode";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating mode filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let modes = {};
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached mode counts
			modes = this.VARS.BROWSE_MENU_OPTIONS.mode;
	} else {
		for (let i=0; i<index.length; i++) {
			let mode = "";
			if (index[i].key) {
				mode = index[i].key.replace(/:.*/, "");
			}
			if (!mode) {
				continue;
			}
			mode = mode.trim();
			modes[mode]++;
		}
	}

	let limitedKeys = Object.getOwnPropertyNames(modes);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.mode);
	let keys        = fullKeys;

	let tmodes = [];  // Translate modes into active language.
	for (let i=0; i<fullKeys.length; i++) {
		let entry = {};
		entry.value = fullKeys[i];
		entry.count = modes[fullKeys[i]];
		let tkey = fullKeys[i];
		entry.title = this.getTranslation(tkey);
		tmodes.push(entry);
	}

	let that = this;
	tmodes.sort(function(a, b) {
		let groupA = 0;
		if      (a.value === "maj") { groupA = 1; }
		else if (a.value === "min") { groupA = 2; }
		else if (a.value === "ion") { groupA = 3; }
		else if (a.value === "dor") { groupA = 4; }
		else if (a.value === "phr") { groupA = 5; }
		else if (a.value === "lyd") { groupA = 6; }
		else if (a.value === "mix") { groupA = 7; }
		else if (a.value === "aeo") { groupA = 8; }
		else if (a.value === "loc") { groupA = 9; }
		if      (b.value === "maj") { groupB = 1; }
		else if (b.value === "min") { groupB = 2; }
		else if (b.value === "ion") { groupB = 3; }
		else if (b.value === "dor") { groupB = 4; }
		else if (b.value === "phr") { groupB = 5; }
		else if (b.value === "lyd") { groupB = 6; }
		else if (b.value === "mix") { groupB = 7; }
		else if (b.value === "aeo") { groupB = 8; }
		else if (b.value === "loc") { groupB = 9; }
		return groupA - groupB;
	});

	let selectedMode = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.mode) {
		selectedMode = this.VARS.SEARCH.mode;
	}

	let output = "<select class='filter mode'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_mode");
	output += ` [${limitedKeys.length}]`;
	output += "</option>\n";

	for (let i=0; i<tmodes.length; i++) {
		let count = tmodes[i].count;
		output += '<option value="';
		if (!count) {
			output += ' disabled';
		}
		output += tmodes[i].value;
		output += '"'
		if (selectedMode === tmodes[i].value) {
			output += " selected";
		}
		output += '>';
		output += tmodes[i].title.replace("ZZZZZ ", "");
		if (count) {
			output += ` (${count})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildModeFilter, "name", { value: "buildModeFilter" });



