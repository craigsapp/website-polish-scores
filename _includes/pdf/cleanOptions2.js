{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 19:46:46 PDT 2021
// Last Modified: Sat Oct 30 19:46:49 PDT 2021
// Filename:      _includes/browse/cleanOptions2.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Remove options that will be processed interally from the data.
//
{% endcomment %}

POPC2.prototype.cleanOptions2 = function (content, options) {
	var lines = content.match(/[^\r\n]+/g);
	var output = options;
	var setlist = [""];
	var optionsets = {};
	optionsets[""] = {};
	var i;

	for (i=0; i<lines.length; i++) {
		var matches = lines[i].match(/^!!!verovio([^\s]*):\s*(.*)\s*$/);
		if (!matches) {
			continue;
		}
		if (matches[1] == "-parameter-group") {
			setlist.push(matches[2]);
			continue;
		}
		var mm = matches[2].match(/^\s*([^\s]+)\s+(.*)\s*$/);
		if (!mm) {
			continue;
		}
		var m = matches[1].match(/^-([^\s]+)\s*$/);
		var set = "";
		if (m) {
			set = m[1];
		}
		if (typeof optionsets[set] === 'undefined') {
			optionsets[set] = {};
		}
		optionsets[set][mm[1]] = mm[2];
	}

	for (i=0; i<setlist.length; i++) {
		if (!optionsets[setlist[i]]) {
			continue;
		}
		var keys = Object.keys(optionsets[setlist[i]]);
		var j;
		var key;
		for (j=0; j<keys.length; j++) {
			if (typeof output[keys[j]] !== 'undefined') {
				delete output[keys[j]];
			}
		}
	}

	return output;
}

Object.defineProperty(POPC2.prototype.cleanOptions2, "name", { value: "cleanOptions2" });



