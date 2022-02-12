{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Feb 10 21:48:42 PST 2022
// Last Modified: Thu Feb 10 21:48:45 PST 2022
// Filename:      _includes/browse/buildInstrumentFilter.js
// Used by:       _incuode/browse/doBrowseSearch();
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for instruments on the browse page.
//                This is done by searching through the browse index (or any
//                provided index) and collating the instrument fields
//                for each entry in the index.  The instrument list also
//                gives the number of entries in the full index in
//                the instrument search list in parentheses after instrument
//                abbreviation.
//
{% endcomment %}

POPC2.prototype.buildInstrumentFilter = function (index, target) {
	this.DebugMessageFunctionVerbose();
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}
	if (!target) {
		target = "#filter-instrument";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating instrument filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}

	let instruments = {};
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached instruments counts
			instruments = this.VARS.BROWSE_MENU_OPTIONS.instrument;
	} else {
		for (let i=0; i<index.length; i++) {
			let ain = index[i].AIN;
			if (!ain) {
				continue;
			}
			ain = ain.trim();
			let ains = ain.split(/\s+/);
			for (let j=0; j<ains.length; j++) {
				if (ains[j].match(/^[a-z]/)) {
					let instrument = ains[j];
					if (instrument === "empty") {
						continue;
					}
					if (!instruments[instrument]) {
						instruments[instrument] = 1;
					} else {
						instruments[instrument]++;
					}
				}
			}
		}
	}

	let limitedKeys = Object.getOwnPropertyNames(instruments);
	let fullKeys    = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.instrument);
	let keys        = fullKeys;

	let tinstruments = [];  // Translate instruments into active language.
	for (let i=0; i<fullKeys.length; i++) {
		let entry = {};
		entry.value = fullKeys[i];
		entry.count = instruments[fullKeys[i]];
		entry.title = this.getTranslation(fullKeys[i]);
		tinstruments.push(entry);
	}

	tinstruments.sort(function(a, b) {
		return a.title.localeCompare(b.title);
	});

	// In the future allow multiple instruments to be selected.
	let selectedInstrument = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.instrument) {
		selectedInstrument = this.VARS.SEARCH.instrument;
	}

	let output = "<select class='filter instrument'>\n";

	output += "<option value=''>";
	output += this.getTranslation("instrument");
	output += ` [${limitedKeys.length}]`;
	output += "</option>\n";

	for (let i=0; i<tinstruments.length; i++) {
		let instrument = tinstruments[i];
		let displayInstrument = tinstruments[i].title;
		output += `<option value="${instrument}"`;
		if (selectedInstrument === instrument) {
			output += " selected";
		}
		output += '>';
		output += displayInstrument;
		if (instruments[instrument]) {
			output += ` (${instruments[instrument]})`;
		}
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	let that = this;
	element.onchange = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildInstrumentFilter, "name", { value: "buildInstrumentFilter" });



