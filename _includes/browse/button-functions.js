//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:29:12 PDT 2021
// Last Modified: Wed Oct  6 12:29:15 PDT 2021
// Filename:      _includes/browse/button-functions.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions related to button actions on the browse page.
//

//////////////////////////////
//
// copySearchLink -- Copy a link to the page with the search parameters
//     encoded as parameters in the web address.
//
//      Parameters:
//          y = century query
//          c = composer query
//          s = siglum query
//          g = genre query
//          n = nationality query
//          t = title query
//          l = lyrics query
//

function copySearchLink() {
	let base = window.location.origin;
	let url = base;
	let search = "";
	if (typeof GLOBAL.SEARCH.century !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `y=${encodeURIComponent(GLOBAL.SEARCH.century)}`;
	}
	if (typeof GLOBAL.SEARCH.composer !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `c=${encodeURIComponent(GLOBAL.SEARCH.composer)}`;
	}
	if (typeof GLOBAL.SEARCH.siglum !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `s=${encodeURIComponent(GLOBAL.SEARCH.siglum)}`;
	}
	if (typeof GLOBAL.SEARCH.genre !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `g=${encodeURIComponent(GLOBAL.SEARCH.genre)}`;
	}
	if (typeof GLOBAL.SEARCH.nationality !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `n=${encodeURIComponent(GLOBAL.SEARCH.nationality)}`;
	}
	if (typeof GLOBAL.SEARCH.title !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `t=${encodeURIComponent(GLOBAL.SEARCH.title)}`;
	}
	if (typeof GLOBAL.SEARCH.lyrics !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `l=${encodeURIComponent(GLOBAL.SEARCH.lyrics)}`;
	}

	if (!search.match(/^\s*$/)) {
		url += "?" + search;
	}

	copyToClipboard(url);
}



//////////////////////////////
//
// copyToClipboard -- Copy text to the system clipboard.
//

function copyToClipboard(string) {
	{% if site.debug == "true" %}
		console.log("Copying", string, "to clipboard");
	{% endif %}
	let element = document.createElement("textarea");
	element.value = string;
	document.body.appendChild(element);
	element.select();
	document.execCommand("copy");
	document.body.removeChild(element);
};



//////////////////////////////
//
// resetBrowse -- Clear the search fields on the browse page.
//

function resetBrowse() {
	{% if site.debug == "true" %}
		console.log("Resetting browse search fields");
	{% endif %}
	console.log("SEARCH", GLOBAL.SEARCH);
	GLOBAL.SEARCH = {};

	GLOBAL.SEARCH_FREEZE = true;

	var centuryElement     = document.querySelector("select.filter.century");
	var composerElement    = document.querySelector("select.filter.composer");
	var siglumElement      = document.querySelector("select.filter.siglum");
	var genreElement       = document.querySelector("select.filter.genre");
	var nationalityElement = document.querySelector("select.filter.nationality");
	var titleElement       = document.querySelector("input.filter.title");
	var lyricsElement      = document.querySelector("input.filter.lyrics");

	if (centuryElement) {
		centuryElement.value = "";
	}
	if (composerElement) {
		composerElement.value = "";
	}
	if (siglumElement) {
		siglumElement.value = "";
	}
	if (genreElement) {
		genreElement.value = "";
	}
	if (nationalityElement) {
		nationalityElement.value = "";
	}
	if (titleElement) {
		titleElement.value = "";
	}
	if (lyricsElement) {
		lyricsElement.value = "";
	}
	GLOBAL.SEARCH_FREEZE = false;

	filterBrowseIndex();

}



