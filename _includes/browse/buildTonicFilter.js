{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Feb  6 20:02:48 PST 2022
// Last Modified: Sun Feb  6 20:02:51 PST 2022
// Filename:      _includes/browse/buildTonicFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for tonics.  This is
//                done by searching through the browse index (or
//                any provided index) and collating the tonic
//                fields for each entry in the index.  The tonics
//                list also gives the number of entries in the
//                full index in the tonic search list in parentheses
//                after tonic name.
//
{% endcomment %}

POPC2.prototype.buildTonicFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}
	if (!target) {
		target = "#filter-tonic";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating tonic filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let tonics = {};
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached tonic counts
			tonics = this.VARS.BROWSE_MENU_OPTIONS.tonic;
	} else {
		for (let i=0; i<index.length; i++) {
			let tonic = "";
			if (index[i].key) {
				tonic = index[i].key.replace(/:.*/, "").toUpperCase();
			}
			if (!tonic) {
				continue;
			}
			tonic = tonic.trim();
			if (tonics[tonic]) {
				tonics[tonic]++;
			} else {
				tonics[tonic] = 1;
			}
		}
	}

	let limitedKeys = Object.getOwnPropertyNames(tonics);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.tonic);

	let ttonics = [];  // Translate tonics into active language.
	for (let i=0; i<fullKeys.length; i++) {
		let entry = {};
		entry.value = fullKeys[i];
		entry.count = tonics[limitedKeys[i]] || 0;
		let tkey = fullKeys[i].toUpperCase().replace(/-/, "-flat").replace(/#/, "-sharp");
		tkey = `tonic_${tkey}`;
		entry.title = this.getTranslation(tkey);
		ttonics.push(entry);
	}

	let that = this;
	ttonics.sort(function(a, b) {
		let letterA = "";
		let letterB = "";
		let accidentalA = 0;
		let accidentalB = 0;
		let matches;
		let A = a.value;
		let B = b.value;

		if (matches = A.match(/^([A-G])/)) {
			letterA = matches[1];
		}
		if (matches = B.match(/^([A-G])/)) {
			letterB = matches[1];
		}

		if (matches = A.match(/flat/)) {
			letterA = -1;
		} else if (matches = A.match(/sharp/)) {
			letterA = +1;
		}

		if (matches = B.match(/flat/)) {
			letterB = -1;
		} else if (matches = B.match(/sharp/)) {
			letterB = +1;
		}

		let lang = that.VARS.LANGUAGE;
		if ((lang === "PL") || (lang === "DE")) {
			// sort by C-A:B:H in Polish/German, flat/natural/sharp
			if (letterA === letterB) {
				return accidentalA - accidentalB;
			} else {
				if (letterA === "A") {
					letterA = "X";
				} else if (letterA === "B") {
					letterA = "Y";
				} else if (letterA === "H") {
					letterA = "Z";
				}
				if (letterB === "A") {
					letterB = "X";
				} else if (letterB === "B") {
					letterB = "Y";
				} else if (letterB === "H") {
					letterB = "Z";
				}
				return letterA.localeCompare(letterB);
			}
		} else {
			// sort by C-B in English, then flat/natural/sharp for ties.
			if (letterA === letterB) {
				return accidentalA - accidentalB;
			} else {
				if (letterA === "A") {
					letterA = "Y";
				}
				if (letterB === "A") {
					letterB = "Y";
				}
				if (letterA === "B") {
					letterA = "Z";
				}
				if (letterB === "B") {
					letterB = "Z";
				}
				return letterA.localeCompare(letterB);
			}
		}
	});

	let selectedTonic = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.tonic) {
		selectedTonic = this.VARS.SEARCH.tonic;
	}

	let output = "<select class='filter tonic'>\n";

	output += "<option value=''>";
	output += this.getTranslation("any_tonic");
	output += ` [${limitedKeys.length}]`;
	output += "</option>\n";

	for (let i=0; i<ttonics.length; i++) {
		output += '<option';
		if (!ttonics[i].count) {
			output += ' disabled';
		}
		output += ' value="';
		output += ttonics[i].value;
		output += '"'
		if (selectedTonic === ttonics[i].value) {
			output += " selected";
		}
		output += '>';
		output += ttonics[i].title.replace("ZZZZZ ", "");
		if (ttonics[i].count) {
			output += ` (${ttonics[i].count})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildTonicFilter, "name", { value: "buildTonicFilter" });



