{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Wed Oct 13 00:39:54 PDT 2021
// Filename:      _includes/work/showKeyscape.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Prepare a Humdrum score and then display on page.
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
	let kelement = document.querySelector("#keyscape");
	let contents = `<img src="${url}">`;
	if (kelement) {
		kelement.innerHTML = contents;
	}
};

Object.defineProperty(POPC2.prototype.showKeyscape, "name", { value: "showKeyscape" });



