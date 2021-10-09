{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:29:12 PDT 2021
// Last Modified: Wed Oct  6 12:29:15 PDT 2021
// Filename:      _includes/browse/copySearchLink.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Copy a link to the page with the search parameters
//                encoded as parameters in the web address.
//
// URL Parameters:
//    y = century query
//    c = composer query
//    s = siglum query
//    g = genre query
//    n = nationality query
//    t = title query
//    l = lyrics query
//
{% endcomment %}

POPC2.prototype.copySearchLink = function () {
	let base = window.location.origin;
	let url = base;
	let search = "";
	if (typeof this.GLOBAL.SEARCH.century !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `y=${encodeURIComponent(this.GLOBAL.SEARCH.century)}`;
	}
	if (typeof this.GLOBAL.SEARCH.composer !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `c=${encodeURIComponent(this.GLOBAL.SEARCH.composer)}`;
	}
	if (typeof this.GLOBAL.SEARCH.siglum !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `s=${encodeURIComponent(this.GLOBAL.SEARCH.siglum)}`;
	}
	if (typeof this.GLOBAL.SEARCH.genre !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `g=${encodeURIComponent(this.GLOBAL.SEARCH.genre)}`;
	}
	if (typeof this.GLOBAL.SEARCH.nationality !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `n=${encodeURIComponent(this.GLOBAL.SEARCH.nationality)}`;
	}
	if (typeof this.GLOBAL.SEARCH.title !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `t=${encodeURIComponent(this.GLOBAL.SEARCH.title)}`;
	}
	if (typeof this.GLOBAL.SEARCH.lyrics !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `l=${encodeURIComponent(this.GLOBAL.SEARCH.lyrics)}`;
	}

	if (!search.match(/^\s*$/)) {
		url += "?" + search;
	}

	this.CopyToClipboard(url);
};



