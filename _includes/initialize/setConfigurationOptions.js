{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Feb  7 23:00:17 PST 2024
// Last Modified: Wed Feb  7 23:00:21 PST 2024
// Filename:      _includes/initialize/setConfigurationOptions.js
// Used by:       _includes/initialize/main.html
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Set configuration options from the "c" URL
//                parameter.
//
//  Code    Meaning
// ------------------------------
//  Ms        Modern stemming
//  Ml        Modern letters
//  Oc        Only bass/treble clefs
//  An        Show all notes
//  Er        Expand repeat marks
//  As        Automatic stemming
//  Ss        Sounding score
//  Ts        Tight spacing
//  Hs        Hide sic warnings
//  Sa        Apply sic corrections
//  Fs        First system only
//  Sc        Show custodes
//  Tr{+P5}   Transposition
//  Tp{140.8} Tempo scaling
//  Fi{extract -k 1}    Filter
// ------------------------------
//
{% endcomment %}

POPC2.prototype.setConfigurationOptions = function (cparameters) {
	this.DebugMessageFunction(cparameters);

	cparameters = decodeURIComponent(cparameters);
	cparameters = cparameters.replace(/^c=/, "");
	let pattern = /([A-Z][a-z](?:\{.*?\})?)/g;
	let entries = cparameters.match(pattern);

	let zz = {};
	for (let i=0; i<entries.length; i++) {
		let obj = {};
		obj.name = entries[i].replace(/\{.*/, "");
		obj.param = null;
		let matches;
		if (matches = entries[i].match(/\{(.*)\}/)) {
			obj.param = matches[1];
		}
		zz[obj.name] = obj;
	}

	let toolsElement = document.querySelector("#tools");
	if (!toolsElement) {
		return;
	}

	let MsElement = toolsElement.querySelector("#checkbox-stemming");
	let MlElement = toolsElement.querySelector("#checkbox-letters");
	let OsElement = toolsElement.querySelector("#checkbox-noclefs");
	let AnElement = toolsElement.querySelector("#checkbox-shownotes");
	let ErElement = toolsElement.querySelector("#checkbox-expandrep");
	let AsElement = toolsElement.querySelector("#checkbox-autostems");
	let SsElement = toolsElement.querySelector("#checkbox-soundingscore");
	let TsElement = toolsElement.querySelector("#checkbox-tightspacing");
	let HsElement = toolsElement.querySelector("#checkbox-sic-hide");
	let SaElement = toolsElement.querySelector("#checkbox-sic-apply");
	let FsElement = toolsElement.querySelector("#checkbox-incipit");
	let ScElement = toolsElement.querySelector("#checkbox-show-custodes");
	let TrSelectElement = toolsElement.querySelector("#select-transposition");
	let TpCheckElement = toolsElement.querySelector("#checkbox-tempo-scaling");
	let TpInputElement = toolsElement.querySelector("#tempo-scaling-input");
	let FiCheckElement = toolsElement.querySelector("#checkbox-filter");
	let FiInputElement = toolsElement.querySelector("#filter-input");

	if (MsElement && (zz.Ms !== undefined)) { MsElement.checked = true; }
	if (MlElement && (zz.Ml !== undefined)) { MlElement.checked = true; }
	if (OsElement && (zz.Os !== undefined)) { OsElement.checked = true; }
	if (AnElement && (zz.An !== undefined)) { AnElement.checked = true; }
	if (ErElement && (zz.Er !== undefined)) { ErElement.checked = true; }
	if (AsElement && (zz.As !== undefined)) { AsElement.checked = true; }
	if (SsElement && (zz.Ss !== undefined)) { SsElement.checked = true; }
	if (TsElement && (zz.Ts !== undefined)) { TsElement.checked = true; }
	if (HsElement && (zz.Hs !== undefined)) { HsElement.checked = true; }
	if (SaElement && (zz.Sa !== undefined)) { SaElement.checked = true; }
	if (FsElement && (zz.Fs !== undefined)) { FsElement.checked = true; }
	if (ScElement && (zz.Sc !== undefined)) { ScElement.checked = true; }

	if (TrSelectElement && (zz.Tr !== undefined)) {
		let options = TrSelectElement.querySelectorAll("option");
		for (let i=0; i<options.length; i++) {
			if (options[i].value === zz.Tr.param) {
				TSSelectElement = options[i].value;
				break;
			}
		}
	}

	if (TpCheckElement && TpInputElement && (zz.Tp !== undefined)) {
		TpCheckElement.checked = true;
		TpInputElement.value = zz.Tp.param;
	}

	if (FiCheckElement && FiInputElement && (zz.Fi !== undefined)) {
		FiCheckElement.checked = true;
		FiInputElement.value = zz.Fi.param;
	}

};

Object.defineProperty(POPC2.prototype.setConfigurationOptions, "name", { value: "setConfigurationOptions" });



