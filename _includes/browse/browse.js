// vim: ts=3:nowrap


//////////////////////////////
//
// displayBrowsePage --
//

function displayBrowsePage() {
	{% if site.debug == "true" %}
		console.log("DISPLAYING BROWSE PAGE");
	{% endif %}
	var telement = document.querySelector("#template-browse");
	if (!telement) {
		console.error("ERROR: Cannot find #template-browse.");
		return;
	}
	var tsource = telement.textContent;
	if (!tsource) {
		console.error("ERROR: Cannot find browse-page template");
		return;
	}
	var workTemplate = Handlebars.compile(tsource);
	var output = workTemplate();

	targets = document.querySelectorAll("#content .page");

	for (let i=0; i<targets.length; i++) {
		if (targets[i].id === "browse-page") {
			targets[i].classList.remove("hidden");
			targets[i].innerHTML = output;
		}
	}

	buildBrowseFilters();
	filterBrowseIndex();
}



//////////////////////////////
//
// copySearchLink --
//      Parameters:
//          y = century
//          c = composer
//          s = siglum
//          g = genre
//          n = nationality
//          t = title
//          l = lyrics
//

function copySearchLink() {
	let base = window.location.origin;
	let url = base;
	let search = "";
	if (typeof SEARCH.century !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `y=${encodeURIComponent(SEARCH.century)}`;
	}
	if (typeof SEARCH.composer !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `c=${encodeURIComponent(SEARCH.composer)}`;
	}
	if (typeof SEARCH.siglum !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `s=${encodeURIComponent(SEARCH.siglum)}`;
	}
	if (typeof SEARCH.genre !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `g=${encodeURIComponent(SEARCH.genre)}`;
	}
	if (typeof SEARCH.nationality !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `n=${encodeURIComponent(SEARCH.nationality)}`;
	}
	if (typeof SEARCH.title !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `t=${encodeURIComponent(SEARCH.title)}`;
	}
	if (typeof SEARCH.lyrics !== "undefined") {
		if (!search.match(/^\s*$/)) { search += "&"; }
		search += `l=${encodeURIComponent(SEARCH.lyrics)}`;
	}

	if (!search.match(/^\s*$/)) {
		url += "?" + search;
	}

	copyToClipboard(url);
}



//////////////////////////////
//
// copyToClipboard --
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
// resetBrowse --
//

function resetBrowse() {
	{% if site.debug == "true" %}
		console.log("Resetting browse search fields");
	{% endif %}
	console.log("SEARCH", SEARCH);
	SEARCH = {};

	SEARCH_FREEZE = true;
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
	SEARCH_FREEZE = false;

	filterBrowseIndex();

}
