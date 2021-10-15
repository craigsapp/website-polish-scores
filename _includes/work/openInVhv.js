{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 19:37:15 PDT 2021
// Last Modified: Thu Oct 14 19:37:17 PDT 2021
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
	url = "https://verovio.humdrum.org?file=";
	url += encodeURIComponent(`${this.SETTINGS.data_addr}/${id}.krn`);
console.log("URL:", url);
	window.open(url, "_blank");

};

Object.defineProperty(POPC2.prototype.openInVhv, "name", { value: "openInVhv" });


