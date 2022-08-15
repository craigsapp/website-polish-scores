{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Tue Oct 19 19:13:56 PDT 2021
// Filename:      _includes/browse/getComposerLinks.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get links to Wikipedia, PMP, CPDL, IMSLP and RISM for composer.
//
{% endcomment %}

POPC2.prototype.getComposerLinks = function (composer) {
	this.DebugMessageFunction();

	if (!composer) {
		// maybe use SEARCH composer here.
		return "";
	}

	if (composer === "Anonymous") {
		return "";
	}

	if (composer === "Anonim") {
		return "";
	}

	if (composer === "Anonymus") {
		return "";
	}

	let entry = this.VARS.COMPOSER_INDEX[composer];

	if (!entry) {
		return "";
	}

	let output = "";

	// CPDL link:
	let cpdl = entry["URL-COM-cpdl"];
	if (cpdl) {
		cpdl = cpdl.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${cpdl}">CPDL</a>`;
		output += "</span>";
	}

	// IMSLP link:
	let imslp = entry["URL-COM-imslp"];
	if (imslp) {
		imslp = imslp.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${imslp}">IMSLP</a>`;
		output += "</span>";
	}

	// NIFC link:
	let nifc = "";
	if (this.VARS.LANGUAGE === "PL") {
		nifc = entry["URL-COM-nifc@PL"];
	}
	if (!nifc) {
		nifc = entry["URL-COM-nifc@EN"];
	}
	if (nifc) {
		nifc = nifc.trim();
		let content = this.getTranslation("pmp");
		output += "<span class='composer-link'>";
		output += `<a class="trans" data-trans="pmp" target="_blank" href="${nifc}">${content}</a>`;
		output += "</span>";
	}

	// RISM link:
	let rismid = entry["COM-rismID"];
	// Check for older aliases for this parameter
	if (!rismid) { rismid = entry["COM-rismid"]; }
	if (!rismid) { rismid = entry["COM-rism"]; }
	if (rismid) {
		rismid = rismid.trim();
		// let url = `https://opac.rism.info/metaopac/search?View=rism&id=${rismid}`;
		let url = `https://rism.online/people/${rismid.replace(/^pe/, "")}`;
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${url}">RISM</a>`;
		output += "</span>";
	}

	// VIAF link:
	let viaf = entry["VIAF"];
	let url = `https://viaf.org/viaf/${viaf}`;
	if (viaf) {
		viaf = viaf.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${url}">VIAF</a>`;
		output += "</span>";
	}

	// Wikidata link:
	let wikidata = entry["URL-COM-wikidata"];
	if (wikidata) {
		wikidata = wikidata.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${wikidata}">Wikidata</a>`;
		output += "</span>";
	}

	// Wikipedia link:
	let wikipedia = "";
	if (this.VARS.LANGUAGE === "PL") {
		wikipedia = entry["URL-COM-wikipedia@PL"];
	}
	if (!wikipedia) {
		wikipedia = entry["URL-COM-wikipedia@EN"];
	}
	if (!wikipedia) {
		wikipedia = entry["URL-COM-wikipedia"];
	}
	if (wikipedia) {
		wikipedia = wikipedia.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${wikipedia}">Wikipedia</a>`;
		output += "</span>";
	}

	// Worldcat link:
	let worldcat = entry["URL-COM-worldcat"];
	if (worldcat) {
		worldcat = worldcat.trim();
		output += "<span class='composer-link'>";
		output += `<a target="_blank" href="${worldcat}">Worldcat</a>`;
		output += "</span>";
	}

	return output;
};

Object.defineProperty(POPC2.prototype.getComposerLinks, "name", { value: "getComposerLinks" });



