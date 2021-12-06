{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Dec  4 16:55:37 CET 2021
// Last Modified: Mon Dec  6 14:27:45 CET 2021
// Filename:      _includes/iiif/getIiifBase.js
// Used by:       
// Included in:   _includes/iiif/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Check the element path for a mouse click and 
//                process any IIIF that is active on the current
//                click path.
//
{% endcomment %}

POPC2.prototype.getIiifBase = function (line, field) {
	let humdrum = this.GetHumdrumOnPage();
	let lines = humdrum.split(/\r?\n/);
	let output = {};
	output.xywh = "0,0,0,0";
	output.tag = "";
	output.iiifbase = "";

	// Currently requiring no spine splits or merges.
	for (let i=line-1; i>=0; i--) {
		if (!lines[i].match(/^\*/)) {
			continue;
		}
		let fields = lines[i].split(/\t+/);
		let matches = fields[field].match(/^\*xywh:(.*)$/);
		if (matches) {
			output.xywh = matches[1];
		}
		matches = fields[field].match(/^\*iiif:([^:]+)/);
		if (matches) {
			output.tag = matches[1];
			break;
		}
	}
	if (output.tag === "") {
		return;
	}
	
	// Also get the IIIF base URL from references records.
	// (most likely at end of file, so searching backwards):
	let skey = `^!!!IIIF-${output.tag}:\\s*([^\\s]+)`;
	let regex = new RegExp(skey);
	for (let i=lines.length - 1; i>=0; i--) {
		let matches = lines[i].match(regex);
		if (matches) {
			output.iiifbase = matches[1];
			break;
		}
	}

	return output;
};

Object.defineProperty(POPC2.prototype.getIiifBase, "name", { value: "getIiifBase" });



