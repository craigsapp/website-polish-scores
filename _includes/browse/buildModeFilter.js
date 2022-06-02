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
	let modeCounts = [];

	// Force order of modes
	let modeOrder = {};
	modeOrder["maj"] = 0;
	modeOrder["min"] = 1;
	modeOrder["dor"] = 2;
	modeOrder["phr"] = 3;
	modeOrder["lyd"] = 4;
	modeOrder["mix"] = 5;
	modeOrder["aeo"] = 6;
	modeOrder["ion"] = 7;
	let sortedModes = Object.getOwnPropertyNames(modeOrder);

	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached mode counts
			let tempModes = this.VARS.BROWSE_MENU_OPTIONS.mode;
				modeCounts[0] = tempModes["maj"];
				modeCounts[1] = tempModes["min"];
				modeCounts[2] = tempModes["dor"];
				modeCounts[3] = tempModes["phr"];
				modeCounts[4] = tempModes["lyd"];
				modeCounts[5] = tempModes["mix"];
				modeCounts[6] = tempModes["aeo"];
				modeCounts[7] = tempModes["ion"];
	} else {
		for (let i=0; i<index.length; i++) {
			let mode = "";
			if (index[i].key) {
				let matches;
				matches = index[i].key.match(/:(.*)/);
				if (matches) {
					mode = matches[1];
				} else if (index[i].key.match(/^[A-G]/)) {
					mode = "maj";
				} else if (index[i].key.match(/^[a-g]/)) {
					mode = "min";
				}
			}
			if (!mode) {
				continue;
			}
			mode = mode.trim();
			if (modeCounts[modeOrder[mode]]) {
				modeCounts[modeOrder[mode]]++;
			} else {
				modeCounts[modeOrder[mode]] = 1;
			}
		}
	}

	let limitedKeys = Object.getOwnPropertyNames(modeCounts);
	let limitedCount = 0;
	for (let i=0; i<limitedKeys.length; i++) {
		if (limitedKeys[i].match(/^\d+$/)) {
			limitedCount++;
		}
	}

	let tmodes = [];  // Translate modes into active language.
	for (let i=0; i<sortedModes.length; i++) {
		let entry = {};
		entry.value = i;
		entry.count = modeCounts[i];
		let tkey = sortedModes[i];
		entry.title = this.getTranslation(tkey);
		tmodes.push(entry);
	}

	let that = this;

	let selectedMode = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.mode) {
		selectedMode = this.VARS.SEARCH.mode;
	}

	let output = "<select class='filter mode";
	if (selectedMode) {
		output += " browse-highlight";
		this.VARS.BROWSE_DELETE_HIGHLIGHT = true;
	}
	output += "'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_mode");
	output += ` [${limitedCount}]`;
	output += "</option>\n";

	for (let i=0; i<tmodes.length; i++) {
		let count = tmodes[i].count;
		output += '<option'
		if (!count) {
			output += ' disabled';
		}
		output += ' value="';
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



