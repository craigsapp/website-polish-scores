{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 15:32:12 PDT 2021
// Last Modified: Thu Oct 14 15:32:16 PDT 2021
// Filename:      _includes/work/copyWorkLink.js
// Used by:       _includes/navigator/toolbar-work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Copy a link to the page with the search parameters
//                encoded as parameters in the web address.
//
// URL Parameters:
//    id = Work ID of score to display when loading page
// Search-related parameters (to build work navigation list):
//    y = century query
//    c = composer query
//    s = siglum query
//    g = genre query
//    n = nationality query
//    t = title query
//    l = lyrics query
//    p = pitch query
//
{% endcomment %}

POPC2.prototype.copyWorkLink = function () {
	this.DebugMessageFunction();
	let base = window.location.origin;
	let url = base;
	let search = "";
	if (this.VARS.WORK_ID) {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `id=${encodeURIComponent(this.VARS.WORK_ID)}`;
		search = search.replace(/%3A/ig, ":");
	}
	if (typeof this.VARS.SEARCH.century !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `y=${encodeURIComponent(this.VARS.SEARCH.century)}`;
	}
	if (typeof this.VARS.SEARCH.composer !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `c=${encodeURIComponent(this.VARS.SEARCH.composer)}`;
	}
	if (typeof this.VARS.SEARCH.siglum !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `s=${encodeURIComponent(this.VARS.SEARCH.siglum)}`;
	}
	if (typeof this.VARS.SEARCH.genre !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `g=${encodeURIComponent(this.VARS.SEARCH.genre)}`;
	}
	if (typeof this.VARS.SEARCH.nationality !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `n=${encodeURIComponent(this.VARS.SEARCH.nationality)}`;
	}
	if (typeof this.VARS.SEARCH.title !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `t=${encodeURIComponent(this.VARS.SEARCH.title)}`;
	}
	if (typeof this.VARS.SEARCH.lyrics !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `l=${encodeURIComponent(this.VARS.SEARCH.lyrics)}`;
	}
	if (typeof this.VARS.SEARCH.pitch !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `p=${encodeURIComponent(this.VARS.SEARCH.pitch)}`;
	}

	if (!search.match(/^\s*$/)) {
		url += "?" + search;
	}

	this.CopyToClipboard(url);
};

Object.defineProperty(POPC2.prototype.copyWorkLink, "name", { value: "copyWorkLink" });



