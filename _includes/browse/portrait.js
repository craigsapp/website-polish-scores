//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/portrait.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Functions for displaying composer portraits on the browse page.
//


//////////////////////////////
//
// updateComposerPortrait -- Display the composer portrait in the
//    GLOBAL.SEARCH.composer field if there is one; otherwise, hide the
//    #portrait element.
//

function updateComposerPortrait() {
	let element = document.querySelector("#portrait");
	if (!element) {
		return;
	}
	if (!GLOBAL.SEARCH.composer) {
		element.style.display = "none";
		return;
	}
	if (element.dataset.composer === GLOBAL.SEARCH.composer) {
		// The composer is already displayed, so don't do anything,
		// except ensure that the portrait is visible:
		element.style.display = "block";
		return;
	}

	let entry = GLOBAL.COMPOSERS[GLOBAL.SEARCH.composer];
	if (!entry) {
		element.style.display = "none";
		return;
	}
	if (!entry.Portrait) {
		// No portrait to display
		element.style.display = "none";
		return;
	}
	let url = entry.Portrait;

	let link = "";
	if (GLOBAL.LANGUAGE === "PL") {
		if (entry["URL-COM-wikipedia@PL"]) {
			link = entry["URL-COM-wikipedia@PL"];
		} else if (entry["URL-COM-wikipedia@EN"]) {
			link = entry["URL-COM-wikipedia@EN"];
		} else {
			link = entry["URL-COM-wikipedia"];
		}
	} else {
		if (entry["URL-COM-wikipedia@EN"]) {
			link = entry["URL-COM-wikipedia@EN"];
		} else if (entry["URL-COM-wikipedia@PL"]) {
			link = entry["URL-COM-wikipedia@PL"];
		} else {
			link = entry["URL-COM-wikipedia"];
		}
	}
	link = link || "";
	let output = "";
	if (link) {
		output += `<a target="_blank" href="${link}">`;
	}
	output += `<img src="${url}">`;
	if (link) {
		output += "</a>";
	}
	output += "<br>";
	output += "<div class='composer-name'>\n";
	let name = GLOBAL.SEARCH.composer;
	let years = makeComposerDates(entry.Birth, entry.Death);
	let matches = name.match(/([^,]+?)\s*,\s*(.*)\s*$/);
	if (matches) {
		name = matches[2] + " " + matches[1];
	}
	if (link) {
		output += `<a target="_blank" href="${link}">`;
	}
	output += name;
	if (years) {
		output += " (" + years + ")";
	}
	if (link) {
		output += "</a>\n";
	}
	output += "</div>\n";

	element.innerHTML = output;
	element.style.display = "block";
	element.dataset.composer = GLOBAL.SEARCH.composer;
}



//////////////////////////////
//
// makeComposerDates -- Take Humdrum-formatted birth and
//    death dates and create a date range to display on a webpage
//    Currently processes cases where a specific year for both
//    birth and death are known; otherwise, returns an empty string.
//

function makeComposerDates(birth, death) {
console.log("PREPARING DATES FOR", birth, "AND", death);
	let output = "";
	let byear = "";
	let dyear = "";
	let matches = birth.match(/^(\d{4})/);
	if (matches) {
		byear = matches[1];
	}
	if (!birth) {
		return "";
	}
	if (!death) {
		return "";
	}

	matches = death.match(/^(\d{4})/);
	if (matches) {
		dyear = matches[1];
	}
	if (byear && dyear) {
		return `${byear}&ndash;${dyear}`;
	} else {
		// Only displaying years when both birth and death are
		// known exactly.
		return "";
	}
}


