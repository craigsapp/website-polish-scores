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
//  An        Show all notes
//  As        Automatic stemming
//  Bb        Break barlines
//  Cs        Continuous system
//  Er        Expand repeat marks
//  Fs        First system only
//  Hf        Hide sic warnings
//  Hs        Hide sic warnings
//  Ml        Modern letters
//  Mo        Modernized score ("M" button in navigator bar)
//  Ms        Modern stemming
//  Nl        No lyrics (suppress lyrics)
//  Ob        Original system breaks
//  Oc        Only bass/treble clefs
//  Sa        Apply sic corrections
//  Sc        Show custodes
//  Ss        Sounding score
//  Ts        Tight spacing
//
//  Options that are other than checkboxes:
//
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
	let pattern = /([A-Z][a-z]+(?:\{.*?\})?)/g;
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

	let AnElement = toolsElement.querySelector("#checkbox-shownotes");
	let AsElement = toolsElement.querySelector("#checkbox-autostems");
	let BbElement = toolsElement.querySelector("#checkbox-break-barlines");
	let CsElement = toolsElement.querySelector("#checkbox-continuous-system");
	let ErElement = toolsElement.querySelector("#checkbox-expandrep");
	let FsElement = toolsElement.querySelector("#checkbox-incipit");
	let HfElement = toolsElement.querySelector("#checkbox-hide-fingerings");
	let HsElement = toolsElement.querySelector("#checkbox-sic-hide");
	let MlElement = toolsElement.querySelector("#checkbox-letters");
	let MsElement = toolsElement.querySelector("#checkbox-stemming");
	let NlElement = toolsElement.querySelector("#checkbox-nolyrics");
	let ObElement = toolsElement.querySelector("#checkbox-original-sysbreaks");
	let OcElement = toolsElement.querySelector("#checkbox-nocclefs");
	let SaElement = toolsElement.querySelector("#checkbox-sic-apply");
	let ScElement = toolsElement.querySelector("#checkbox-show-custodes");
	let SsElement = toolsElement.querySelector("#checkbox-soundingscore");
	let TsElement = toolsElement.querySelector("#checkbox-tightspacing");

	let TrSelectElement = toolsElement.querySelector("#select-transposition");
	let TpCheckElement = toolsElement.querySelector("#checkbox-tempo-scaling");
	let TpInputElement = toolsElement.querySelector("#tempo-scaling-input");
	let FiCheckElement = toolsElement.querySelector("#checkbox-filter");
	let FiInputElement = toolsElement.querySelector("#filter-input");

	if (zz.Mo !== undefined) {
		popc2.makeNotationModern();
	}

	if (AnElement && (zz.An !== undefined)) { AnElement.checked = true; }
	if (AsElement && (zz.As !== undefined)) { AsElement.checked = true; }
	if (BbElement && (zz.Bb !== undefined)) { BbElement.checked = true; }
	if (CsElement && (zz.Cs !== undefined)) { CsElement.checked = true; }
	if (ErElement && (zz.Er !== undefined)) { ErElement.checked = true; }
	if (FsElement && (zz.Fs !== undefined)) { FsElement.checked = true; }
	if (HfElement && (zz.Hf !== undefined)) { HfElement.checked = true; }
	if (HsElement && (zz.Hs !== undefined)) { HsElement.checked = true; }
	if (MlElement && (zz.Ml !== undefined)) { MlElement.checked = true; }
	if (MsElement && (zz.Ms !== undefined)) { MsElement.checked = true; }
	if (NlElement && (zz.Nl !== undefined)) { NlElement.checked = true; }
	if (ObElement && (zz.Ob !== undefined)) { ObElement.checked = true; }
	if (OcElement && (zz.Oc !== undefined)) { OcElement.checked = true; }
	if (SaElement && (zz.Sa !== undefined)) { SaElement.checked = true; }
	if (ScElement && (zz.Sc !== undefined)) { ScElement.checked = true; }
	if (SsElement && (zz.Ss !== undefined)) { SsElement.checked = true; }
	if (TsElement && (zz.Ts !== undefined)) { TsElement.checked = true; }

	if (TrSelectElement && (zz.Tr !== undefined)) {
		let options = TrSelectElement.querySelectorAll("option");
		for (let i=0; i<options.length; i++) {
			if (options[i].value === zz.Tr.param) {
				TrSelectElement.value = options[i].value;
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



