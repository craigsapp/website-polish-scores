{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 18:51:07 PDT 2021
// Last Modified: Wed Nov  3 18:51:10 PDT 2021
// Filename:      _includes/analysis/getAnalysisFilter.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.getAnalysisFilter = function () {
	this.DebugMessageFunction();

	element = document.querySelector("#analysis-select");
	if (!element) {
		console.error("Cannot find #analysis-select");
		return;
	}

	let value = element.value;
	this.displayAnalysisPanel(value);
	if (!value) {
		return "";
	}
	let name = value;

	let options = document.querySelectorAll(`#analysis-${value} [id^="option-"]`);
	let booleans = [];
	for (let i=0; i<options.length; i++) {
		if ((options[i].nodeName === "INPUT") && (options[i].type === "checkbox")) {
			if (options[i].checked) {
				booleans.push(options[i]);
			}
		}
	}

	let singleBool   = [];
	let multipleBool = [];
	if (booleans.length > 0) {
		for (let i=0; i<booleans.length; i++) {
			let id = booleans[i].id;
			if (!id) {
				continue;
			}
			let matches = id.match(/option-([a-zA-Z0-9][a-zA-Z0-9-]*)/);
			if (matches) {
				let newmatches = id.match(/option-([a-zA-Z0-9_][a-zA-Z0-9-_]*)/);
				let value = newmatches[1];
				value = value.replace("_", " ", "g");
				if (matches[1].length == 1) {
					singleBool.push(value);
				} else {
					multipleBool.push(value);
				}
			}
		}
	}
	if (singleBool.length > 0) {
		for (let i=0; i<singleBool.length; i++) {
			value += " -";
			value += singleBool[i];
		}
	}
	if (multipleBool.length > 0) {
		for (let i=0; i<multipleBool.length; i++) {
			value += " --" + multipleBool[i];
		}
	}

	// add additional options depending on the analysis tool

	// need to add extra filters for some cases:

	// For composite -x, currently need to add "| rid -d" after the filter:
	if (value.match(/\s-[^\s-]*x/)) {
		value += " | rid -glid";
	}

	return value;
};

Object.defineProperty(POPC2.prototype.getAnalysisFilter, "name", { value: "getAnalysisFilter" });



