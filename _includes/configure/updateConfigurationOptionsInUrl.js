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

	let MoElement = document.querySelector("#modern-button");

	let AnElement = toolsElement.querySelector("#checkbox-shownotes");
	let AsElement = toolsElement.querySelector("#checkbox-autostems");
	let ErElement = toolsElement.querySelector("#checkbox-expandrep");
	let CsElement = toolsElement.querySelector("#checkbox-continuous-system");
	let FsElement = toolsElement.querySelector("#checkbox-incipit");
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

	let currentConfig = url.searchParams.get("con");
	if (currentConfig === "") {
		currentConfig = url.searchParams.get("config");
	}
	let newConfig = "";

	if (MoElement && !MoElement.classList.contains("hidden")) {
		newConfig += "Mo";
	}

	if (AnElement && AnElement.checked) { newConfig += "An"; }
	if (AsElement && AsElement.checked) { newConfig += "As"; }
	if (CsElement && CsElement.checked) { newConfig += "Cs"; }
	if (ErElement && ErElement.checked) { newConfig += "Er"; }
	if (FsElement && FsElement.checked) { newConfig += "Fs"; }
	if (HsElement && HsElement.checked) { newConfig += "Hs"; }
	if (MlElement && MlElement.checked) { newConfig += "Ml"; }
	if (MsElement && MsElement.checked) { newConfig += "Ms"; }
	if (NlElement && NlElement.checked) { newConfig += "Nl"; }
	if (ObElement && ObElement.checked) { newConfig += "Ob"; }
	if (OcElement && OcElement.checked) { newConfig += "Oc"; }
	if (SaElement && SaElement.checked) { newConfig += "Sa"; }
	if (ScElement && ScElement.checked) { newConfig += "Sc"; }
	if (SsElement && SsElement.checked) { newConfig += "Ss"; }
	if (TsElement && TsElement.checked) { newConfig += "Ts"; }

	if (TrSelectElement) {
		let value = TrSelectElement.value;
		if (value !== "") {
			newConfig += "Tr{" + value + "}";
		}
	}

	if (TpCheckElement && TpCheckElement.checked) {
		let value = TpInputElement.value;
		let matches;
		if (matches = value.match(/^\s*([\d.]+)\s*$/)) {
			newConfig += "Tp{" + matches[1] + "}";
		}
	}

	if (FiCheckElement && FiCheckElement.checked) {
		let value = FiInputElement.value;
		let matches;
		if (matches = value.match(/^\s*(.+)\s*$/)) {
			// Also deal with cases that contain "}"
			// (maybe exscape with backslash?).
			newConfig += "Fi{" + matches[1] + "}";
		}
	}

	if (!url.href) {
		url.href = "";
	}

	if (newConfig !== currentConfig) {
		url.searchParams.delete("config");
		url.searchParams.delete("con");
		if (newConfig !== "") {
			// don't URI encode the "+" sign:
			let encoded = encodeURIComponent(newConfig);
			let prefix = "&";
			if (!url.href.match(/\?/)) {
				prefix = "?";
			}
			url.href += `${prefix}con=${newConfig}`;
		}
		url.href = url.href.replace(/%2B/ig, "+");
		url.href = url.href.replace(/%3A/ig, ":");
		url.href = url.href.replace(/%7D/ig, "}");
		url.href = url.href.replace(/%7D/ig, "}");
		window.history.replaceState({}, '', url.href);
	}

};

Object.defineProperty(POPC2.prototype.updateConfigurationOptionsInUrl, "name", { value: "updateConfigurationOptionsInUrl" });



