{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Fri Oct 22 23:05:17 PDT 2021
// Filename:      _includes/work/showKeyscape.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load a keyscape image into the page.
//
{% endcomment %}

POPC2.prototype.showKeyscape = function (id) {
	this.DebugMessageFunction(id);
	if (!id) {
		id = this.VARS.WORK_ID;
	}
	if (!id) {
		return;
	}
	let url = `${this.SETTINGS.data_addr}/${id}.keyscape-abspre`;
	let imgElement = document.querySelector("#keyscape img");
	imgElement.src = url;
};

Object.defineProperty(POPC2.prototype.showKeyscape, "name", { value: "showKeyscape" });



