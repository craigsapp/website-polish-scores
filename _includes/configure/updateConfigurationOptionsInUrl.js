{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 23 01:38:24 PDT 2021
// Last Modified: Sat Oct 23 01:38:26 PDT 2021
// Filename:      _includes/configure/updateConfigurationOptionsInUrl.js
// Used by:
// Included in:   _includes/configure/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Set current notation configuration parameters in URL.
//
{% endcomment %}

POPC2.prototype.updateConfigurationOptionsInUrl = function () {
	this.DebugMessageFunction();

	let url = new URL(window.location.href);

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

	let currentConfig = url.searchParams.get("config");
console.error("CURENT CONFIG = ", currentConfig);
	let newConfig = "";
	if (MsElement && MsElement.checked) { newConfig += "Ms"; }
	if (MlElement && MlElement.checked) { newConfig += "Ml"; }
	if (OsElement && OsElement.checked) { newConfig += "Os"; }
	if (AnElement && AnElement.checked) { newConfig += "An"; }
	if (ErElement && ErElement.checked) { newConfig += "Er"; }
	if (AsElement && AsElement.checked) { newConfig += "As"; }
	if (SsElement && SsElement.checked) { newConfig += "Ss"; }
	if (TsElement && TsElement.checked) { newConfig += "Ts"; }
	if (HsElement && HsElement.checked) { newConfig += "Hs"; }
	if (SaElement && SaElement.checked) { newConfig += "Sa"; }
	if (FsElement && FsElement.checked) { newConfig += "Fs"; }
	if (ScElement && ScElement.checked) { newConfig += "Sc"; }

	if (TrSelectElement) {
		let value = TrSelectElement.value;
		if (value !== "") {
			newConfig += "Tr_" + value + "_";
		}
	}

	if (TpCheckElement && TpCheckElement.checked) {
		let value = TpInputElement.value;
		let matches;
		if (matches = value.match(/^\s*([\d.]+)\s*$/)) {
			newConfig += "Tp_" + matches[1] + "_";
		}
	}

	if (FiCheckElement && FiCheckElement.checked) {
		let value = FiInputElement.value;
		let matches;
		if (matches = value.match(/^\s*(.+)\s*$/)) {
			// Also deal with cases that contain "_"
			// (maybe exscape with backslash?).
			newConfig += "Fi_" + matches[1] + "_";
		}
	}

	if (newConfig !== currentConfig) {
		console.error("newConfig", newConfig);
		url.searchParams.delete("config");
		if (newConfig !== "") {
			// don't URI encode the "+" sign:
			let encoded = encodeURIComponent(newConfig).replace(/%2B/g, "+");
			url.href += `&config=${newConfig}`;
		}
		window.history.replaceState({}, '', url.href);
	}

};

Object.defineProperty(POPC2.prototype.updateConfigurationOptionsInUrl, "name", { value: "updateConfigurationOptionsInUrl" });



