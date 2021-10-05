// vim: ts=3


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

	// displayBrowseResults();
	filterBrowseIndex();
}



//////////////////////////////
//
// displayBrowseResults --
//

function displayBrowseResults(results, target) {
	if (!target) {
		target = "#results";
	}
	let element = document.querySelector("#results");
	if (!element) {
		console.error("ERROR: Cannot find", target);
		return;
	}

	if (!results) {
		results = BROWSE_RESULTS;
	}

	if (!results) {
		element.innerHTML = "";
		return;
	}

	if (results.length == 0) {
		element.innerHTML = "";
		return;
	}

	let output = "";
	output += "<table class='search-results'>\n";
	output += "<thead>\n";
	output += `<th class="shelfmark">${getTranslation("header_shelfmark")}</th>\n`;
	output += `<th class="composer">${getTranslation("header_composer")}</th>\n`;
	output += `<th class="title">${getTranslation("header_title")}</th>\n`;
	output += "</thead>\n";
	output += "<tbody>\n";

	for (let i=0; i<results.length; i++) {

		let composer = results[i].COM || "";
		let matches = composer.match(/^\s*([^,]+),\s*(.*)\s*$/);
		if (matches) {
			composer = `${matches[1]}<span class='first-name'>, ${matches[2]}</span`;
		} else {
			if ((composer === "Anonim") || (composer === "anonim")) {
				composer = getTranslation("Anonymus");
			}
		}
		let siglum = results[i].siglum || "";
		let shelfmark = results[i].shelfmark || "";

		output += "<tr data-id='xxx'>\n";
		output += "<td class='shelfmark'>";
		output += getShelfMarkContent(siglum, shelfmark);
		output += "</td>\n";
		output += "<td class='composer'>";
		output += composer;
		output += "</td>\n";
		output += "<td class='title'>";
		output += getHighlightedTitleContent(results[i].title || "");
		output += "</td>\n";
		output += "</tr>\n";
	}

	output += "</tbody>\n";
	output += "</table>\n";

	element.innerHTML = output;
}



//////////////////////////////
//
// getShelfmarkContent --
//

function getShelfMarkContent(siglum, shelfmark) {
	let lowshelf = siglum.toLowerCase();
	let output = "";
	output += "<span"
	output += ` title="${getTranslation(lowshelf)}"`;
	output += " class='siglum'>";
	output += `${siglum}`;
	output += "</span>";
	output += `<span class='siglum-postfix'>: `;
	output += `<span class='shelfmark'>${shelfmark}</span>`;
	return output;
}



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



//////////////////////////////
//
// getHighlightedTitleContent
//

function getHighlightedTitleContent(title) {
	if (!SEARCH) {
		return title;
	}
	if (!SEARCH.title) {
		return title;
	}

	target = SEARCH.title.trim();
	let pieces = target.split(/\s*"+\s*/);
	let titleTargets = [];
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = pieces[i].trim();
		if (i % 2 == 0) {
			let newpieces = pieces[i].split(/\s+/);
			for (let j=0; j<newpieces.length; j++) {
				if (newpieces[j]) {
					titleTargets.push(newpieces[j]);
				}
			}
		} else {
			// Exact phrase to search for:
			if (pieces[i]) {
				titleTargets.push(pieces[i]);
			}
		}
	}

	if (titleTargets.length == 0) {
		return title;
	}

	for (let i=0; i<titleTargets.length; i++) {
		let re = new RegExp(titleTargets[i], "gi");
		title = title.replace(re, (match) => `<#>${match}</#>`);
	}
	title = title.replace(/#/g, "span");
	title = title.replace(/<span>/g, "<span class='mark'>");

	return title;
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



