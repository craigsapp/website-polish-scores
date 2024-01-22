{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Jan 22 04:52:35 PST 2024
// Last Modified: Mon Jan 22 04:52:40 PST 2024
// Filename:      _includes/analysis/openPitchRangePlotInNewWindow.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download pitch range plot SVG image.
//
{% endcomment %}

POPC2.prototype.openPitchRangePlotInNewWindow = function (options) {
	this.DebugMessageFunction();

	let id = popc2.VARS.WORK_ID;
	let urlbase = popc2.SETTINGS.data_addr;
	let url = `${urlbase}/${id}-prange`;

	let delement = document.querySelector("#prange-duration");
	if (delement && delement.checked) {
		url += "-duration";
	} else {
		url += "-attack";
	}

	let felement = document.querySelector("#prange-final");
	if (felement && felement.checked) {
		url += "-final";
	}
	url += ".svg";
	let newWindow = window.open(url, '_blank');
	if (newWindow) {
  		newWindow.focus();
	}

};

Object.defineProperty(POPC2.prototype.openPitchRangePlotInNewWindow, "name", { value: "openPitchRangePlotInNewWindow" });



