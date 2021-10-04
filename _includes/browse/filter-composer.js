// vim: ts=3



//////////////////////////////
//
// buildComposerFilter -- Create the search entry for composers.  This is done
//    by searching through the browser index (or any provided index) and collating
//    the unique composers in the COM field for each entry in the index.  The
//    composer list also lists the number of entries in the full index in the
//    composer search list in parentheses after the composer's name.
//

function buildComposerFilter(index, target) {
	if (!index) {
		index = BROWSE_INDEX;
	}
	if (!target) {
		target = "#filter-composer";
	}
	if (!index) {
		console.error("ERROR: Cannot find browse index for creating composer filter.");
		return;
	}
	let element = document.querySelector(target);
	if (!element) {
		console.error("ERROR: Cannot find target", target);
		return;
	}
	let selement = element.querySelector("select");
	let lastComposer = "";
	if (selement) {
		lastComposer = selement.value;
	}

	let composers = {};
	for (let i=0; i<index.length; i++) {
		let com = index[i].COM;
		if (!composers[com]) {
			composers[com] = 1;
		} else {
			composers[com]++;
		}
	}

	let keys = Object.getOwnPropertyNames(composers);
	keys.sort(function(a, b) {
		return a.localeCompare(b);
	});

	let selectedComposer = "";
	if (SEARCH && SEARCH.composer) {
		selectedComposer = SEARCH.composer;
	}
	if (lastComposer) {
		selectedComposer = lastComposer;
	}

	let output = "<select class='filter composer'>\n";
	output += "<option value=''>";
	output += getTranslation("any_composer");
	output += ` (${index.length})`;
	output += "</option>\n";
	for (let i=0; i<keys.length; i++) {
		output += '<option value="';
		let composer = keys[i];
		let displayComposer = composer;
		if ((displayComposer === "Anonim") || (displayComposer === "anonim")) {
			displayComposer = getTranslation("Anonymus");
		}
		if ((displayComposer === "Anonymus") || (displayComposer === "anonymus")) {
			displayComposer = getTranslation("Anonymus");
		}
		if ((displayComposer === "Anonymous") || (displayComposer === "anonymous")) {
			displayComposer = getTranslation("Anonymus");
		}
		output += composer.replace(/"/g, '\\"');
		output += '"'
		if (selectedComposer === composer) {
			output += " selected";
		}
		output += '>';
		output += displayComposer;
		output += " (";
		output += composers[composer];
		output += ")";
		output += "</option>\n";
	}

	output += "</select>\n";

	element.innerHTML = output;
	element.onchange = function() { filterBrowseIndex(); };
}



