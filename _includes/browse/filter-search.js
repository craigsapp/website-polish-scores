//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filter-search.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for doing searches on the browse page.
//


//////////////////////////////
//
// filterBrowseIndex -- Filter the full index by various search fields.
//

function filterBrowseIndex(index) {
	if (GLOBAL.SEARCH_FREEZE) {
		return;
	}
	if (!index) {
		index = GLOBAL.BROWSE_INDEX;
	}

	// Reset search
	GLOBAL.SEARCH = {};

	let results = index;
	let newresults;

	results = filterByCentury(results);
	results = filterByComposer(results);
	results = filterBySiglum(results);
	results = filterByGenre(results);
	results = filterByNationality(results);
	results = filterByTitle(results);
	results = filterByLyrics(results);

	if (results.length != GLOBAL.BROWSE_INDEX) {
		GLOBAL.SEARCH_FREEZE = true;
		buildCenturyFilter(results);
		buildComposerFilter(results);
		buildSiglumFilter(results);
		buildGenreFilter(results);
		buildNationalityFilter(results);
		GLOBAL.SEARCH_FREEZE = false;
	}

	GLOBAL.BROWSE_RESULTS = results;

	showResultsCount(results.length);

	GLOBAL.SEARCH.count = results.length;
	GLOBAL.SEARCH.lang  = GLOBAL.LANGUAGE;
	storeSearchInfo(GLOBAL.SEARCH);

	updateComposerPortrait();
	displayBrowseTable(results);
}



//////////////////////////////
//
// showResultsCount --
//

function showResultsCount(count) {
	let element = document.querySelector("#results-count");
	if (!element) {
		return;
	}
	let output = "";
	if (!count) {
		output = "0 ";
		output += "matches";
	} else if (count == 1) {
		output = "1 ";
		output += "match";
	} else if (count == GLOBAL.BROWSE_INDEX.length) {
		// Everything matches, so not interesting to show the count.
		output = "";
	} else {
		output = count.toString() + " ";
		output += "matches";
	}
	element.innerHTML = output;
}



//////////////////////////////
//
// filterByComposer --
//

function filterByComposer(input) {
	let type = "composer";
	let field = "COM";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	{% if site.debug == "true" %}
		console.log("COMPOSER QUERY:", target);
	{% endif %}
	if (target) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		for (let i=0; i<input.length; i++) {
			if (input[i][field] === target) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterByCentury --
//

function filterByCentury(input) {
	let type = "century";
	let field = "cenid";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	{% if site.debug == "true" %}
		console.log("CENTURY QUERY:", target);
	{% endif %}
	if (target) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		let re = new RegExp("^" + target);
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterBySiglum --
//

function filterBySiglum(input) {
	let type = "siglum";
	let field = "siglum";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	{% if site.debug == "true" %}
		console.log("SIGLUM QUERY:", target);
	{% endif %}
	if (target) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		let re = new RegExp("^" + target);
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterByGenre --
//

function filterByGenre(input) {
	let type = "genre";
	let field = "AGN";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	{% if site.debug == "true" %}
		console.log("GENRE QUERY:", target);
	{% endif %}
	if (target) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		let re = new RegExp("\\b" + target + "\\b");
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterByNationality --
//

function filterByNationality(input) {
	let type = "nationality";
	let field = "CNT";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	{% if site.debug == "true" %}
		console.log("NATIONALITY QUERY:", target);
	{% endif %}
	if (target) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		let re = new RegExp("\\b" + target + "\\b");
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterByTitle --
//

function filterByTitle(input) {
	let type = "title";
	let field = "title";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`input.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}

	target = target.trim();
	let pieces = target.replace(/-"/g, '"-').split(/\s*"+\s*/);
	let titleTargets = [];
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = pieces[i].trim();
		if (i % 2 == 0) {
			let newpieces = pieces[i].split(/\s+/);
			for (let j=0; j<newpieces.length; j++) {
				newpieces[j] = newpieces[j].replace(/^\s*-\s*$/, "");
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

	{% if site.debug == "true" %}
		console.log("TITLE QUERY:", target, titleTargets);
	{% endif %}

	if (titleTargets.length > 0) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		for (let i=0; i<titleTargets.length; i++) {
			let negate = false;
			let searchString = titleTargets[i];
			let matches = searchString.match(/^-(.*)/);
			if (matches) {
				negate = true;
				searchString = matches[1];
			}
			let re = new RegExp(searchString, "i");
			for (let j=0; j<input.length; j++) {
				if (negate) {
					if (!re.exec(input[j][field])) {
						output.push(input[j]);
					}
				} else {
					if (re.exec(input[j][field])) {
						output.push(input[j]);
					}
				}
			}
			if (i < titleTargets.length - 1) {
				input = output;
				output = [];
			}
		}
		return output;
	} else {
		return input;
	}
}



//////////////////////////////
//
// filterByLyrics --
//

function filterByLyrics(input) {
	let type = "lyrics";
	let field = "lyrics";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`input.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}

	// Phrases are not allowed in lyrics search, but pretend they are.
	target = target.trim();
	let pieces = target.split(/\s*"+\s*/);
	let lyricsTargets = [];
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = pieces[i].trim();
		if (i % 2 == 0) {
			let newpieces = pieces[i].split(/\s+/);
			for (let j=0; j<newpieces.length; j++) {
				newpieces[j] = newpieces[j].replace(/^\s*-\s*$/, "");
				if (newpieces[j]) {
					lyricsTargets.push(newpieces[j]);
				}
			}
		} else {
			// Exact phrase to search for:
			if (pieces[i]) {
				lyricsTargets.push(pieces[i]);
			}
		}
	}

	{% if site.debug == "true" %}
		console.log("TITLE QUERY:", target, lyricsTargets);
	{% endif %}

	if (lyricsTargets.length > 0) {
		GLOBAL.SEARCH[type] = target;
		let output = [];
		for (let i=0; i<lyricsTargets.length; i++) {
			let negate = false;
			let searchString = lyricsTargets[i];
			let matches = searchString.match(/^-(.*)/);
			if (matches) {
				negate = true;
				searchString = matches[1];
			}
			let re = new RegExp(searchString, "i");
			for (let j=0; j<input.length; j++) {
				if (negate) {
					if (!re.exec(input[j][field])) {
						output.push(input[j]);
					}
				} else {
					if (re.exec(input[j][field])) {
						output.push(input[j]);
					}
				}
			}
			if (i < lyricsTargets.length - 1) {
				input = output;
				output = [];
			}
		}
		return output;
	} else {
		return input;
	}
}



