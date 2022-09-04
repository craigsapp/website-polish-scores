{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 17:53:22 PDT 2021
// Last Modified: Mon Oct 11 17:53:25 PDT 2021
// Filename:      _includes/browse/buildPitchFilter.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create the search entry for pitch.
//
{% endcomment %}

POPC2.prototype.buildPitchFilter = function (target) {
	this.DebugMessageFunctionVerbose();
	if (!target) {
		target = "#filter-pitch";
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let ielement = element.querySelector("input");
	let lastPitch = "";
	if (ielement) {
		lastPitch = ielement.value;
	}

	let selectedPitch = "";
	if (this.VARS.SEARCH && this.VARS.SEARCH.pitch) {
		selectedPitch = this.VARS.SEARCH.pitch;
	}
	if (lastPitch) {
		selectedPitch = lastPitch;
	}

	if (!selectedPitch.match(/^\s*$/)) {
		this.VARS.BROWSE_DELETE_HIGHLIGHT = true;
	}

	let activeFilter = "";
	if (selectedPitch) {
		activeFilter = " active-filter";
	}

	let output = `<input type='text' spellcheck='false' class='filter pitch${activeFilter}'`;
	output += ` placeholder='${this.getTranslation("pitch_placeholder")}'`;
	output += ` value="${selectedPitch}"`;
	output += ">\n";

	element.innerHTML = output;
	let that = this;
	element.onkeyup = function() { that.doBrowseSearch(); };
};

Object.defineProperty(POPC2.prototype.buildPitchFilter, "name", { value: "buildPitchFilter" });



