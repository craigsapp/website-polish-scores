{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 19:37:15 PDT 2021
// Last Modified: Mon Apr  4 10:38:46 PDT 2022
// Filename:      _includes/work/openInVhv.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-score and musical incipit views.
//
{% endcomment %}

POPC2.prototype.openInVhv = function () {
	this.DebugMessageFunction();

	id = this.VARS.WORK_ID;
	if (!id) {
		return;
	}
	let filter = this.getAnalysisFilter();
	if (filter.match(/^\s*$/)) {
		let FiCheckElement = document.querySelector("#checkbox-filter");
		let FiInputElement = document.querySelector("#filter-input");
		if (FiCheckElement && FiCheckElement.checked) {
			if (FiInputElement && !FiInputElement.value.match(/^\s*$/)) {
				filter = FiInputElement.value.trim();
			}
		}
	}

	url = "https://verovio.humdrum.org?file=";
	url += encodeURIComponent(`${this.SETTINGS.data_addr}/${id}.krn`);
	if (filter) {
		url += "&filter=";
		url += encodeURIComponent(filter);
	}
	url = url.replace(/%2B/ig, "+");
	url = url.replace(/%3A/ig, ":");
	url = url.replace(/%7D/ig, "}");
	url = url.replace(/%7D/ig, "}");
	window.open(url, "_blank");

};

Object.defineProperty(POPC2.prototype.openInVhv, "name", { value: "openInVhv" });



