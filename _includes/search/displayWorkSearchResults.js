{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 12:51:11 PDT 2021
// Last Modified: Thu Oct 21 12:51:13 PDT 2021
// Filename:      _includes/browse/displayWorkSearchResults.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   After runing the msearch filter, extracts its contents
//                to display on the work webpage.
//
// Example embedded results:
//     !!!Xfilter: msearch -p 'c'
//     !!!RDF**kern: @ = marked note
//     !!@@BEGIN: MUSIC_SEARCH_RESULT
//     !!@QUERY:	 -p c
//     !!@MATCHES:	4
//     !!@MARKER:	@
//     !!@@END: MUSIC_SEARCH_RESULT
//
{% endcomment %}

POPC2.prototype.displayWorkSearchResults = function (humdrum) {
	this.DebugMessageFunction();
	if (!humdrum) {
		console.log("No humdrum data in displayWorkSearchResults");
		return;
	}
	if (typeof humdrum !== "string") {
		console.error("ERROR: humdrum data is not text");
		return;
	}

	let lines = humdrum.match(/[^\r\n]+/g);
	let entryIndex = -1;
	for (let i=lines.length - 1; i >= 0; i--) {
		if (lines[i].match(/^!!@@BEGIN:\s*MUSIC_SEARCH_RESULT\s*$/)) {
			entryIndex = i;
			break;
		}
	}
	let swd = document.querySelector("#work-search-details");
	let wsrc = document.querySelector("#work-search-result-count");
	if (entryIndex < 0) {
		// no search made in data, so clear the contents of the work-level
		// search results
		if (wsrc) {
			wsrc.innerHHTML = "";
		}
		if (swd) {
			swd.classList.add("hidden");
		}
		return;
	}

	if (swd) {
		swd.classList.remove("hidden");
	}

	// extract search results
	let atonData = "";
	for (let i=entryIndex; i<lines.length; i++) {
		if (!lines[i].match(/^!!/)) {
			continue;
		}
		atonData += lines[i].replace(/^!+/, "");
		atonData += "\n";
		if (lines[i].match(/^!!@@END:\s*MUSIC_SEARCH_RESULT\s*$/)) {
			break;
		}
	}
	if (!atonData) {
		console.error("ERROR: no search data found");
		return;
	}
	let aton = new ATON;
	jdata = aton.parse(atonData).MUSIC_SEARCH_RESULT;
	console.warn("JDATA", jdata);

	let matchCount = jdata.MATCHES;
	let matchText = matchCount + " " + this.getMatchText(matchCount);

	if (wsrc) {
		wsrc.innerHTML = matchText;
	}

	if (swd) {
		if (matchCount == 0) {
			swd.classList.add("nomarker");
		} else {
			swd.classList.remove("nomarker");
		}
	}

	let db = document.querySelector("#work-search-details .details-body");

	if (matchCount <= 0) {
		db.classList.add("hidden");
		return;
	}
	db.classList.remove("hidden");

	// display detailed list of matches (by measure)
	let matches = jdata.MATCH;
	if (!Array.isArray(matches)) {
		matches = [matches];
	}
	let measures = {};
	for (let i=0; i<matches.length; i++) {
		let list = matches[i].MEASURE.split(" ");
		if (typeof measures[list[0]] !== "undefined") {
			measures[list[0]]++;
		} else {
			measures[list[0]] = 1;
		}
	}
	let mkeys = Object.keys(measures).sort(function(a, b) { return a - b});

	let mtext = "<i>measures</i>:";
	for (let i=0; i<mkeys.length; i++) {
		mtext += " ";
		mtext += `<span class="search-measure" onclick='popc2.gotoMeasure(${mkeys[i]})'>`;
		mtext += mkeys[i];
		mtext += "</span>";
		if (i < mkeys.length - 1) {
			mtext += ",";
		}
	}
	mtext += ".";

	if (db) {
		db.innerHTML = mtext;
	}

	// display repertory-level matches of same search

};

Object.defineProperty(POPC2.prototype.displayWorkSearchResults, "name", { value: "displayWorkSearchResults" });



