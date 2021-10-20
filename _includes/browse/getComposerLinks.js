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

POPC2.prototype.getComposerLinks = function (info) {
	if (!info) {
		return "";
	}

	let output = "";

	// CPDL link:
	let cpdl = info["URL-COM-cpdl"];
	if (cpdl) {
		cpdl = cpdl.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${cpdl}">CPDL</a>`;
		output += "</div>";
	}

	// IMSLP link:
	let imslp = info["URL-COM-imslp"];
	if (imslp) {
		imslp = imslp.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${imslp}">IMSLP</a>`;
		output += "</div>";
	}

	// NIFC link:
	let nifc = "";
	if (this.VARS.LANGUAGE === "PL") {
		nifc = info["URL-COM-nifc@PL"];
	}
	if (!nifc) {
		nifc = info["URL-COM-nifc@EN"];
	}
	if (nifc) {
		nifc = nifc.trim();
		let content = this.getTranslation("pmp");
		output += "<div class='composer-link'>";
		output += `<a class="trans" data-trans="pmp" target="_blank" href="${nifc}">${content}</a>`;
		output += "</div>";
	}

	// RISM link:
	let rismid = info["COM-rism"];
	if (!rismid) {
		rismid = info["COM-rismid"];
	}
	if (rismid) {
		rismid = rismid.trim();
		let url = `https://opac.rism.info/metaopac/search?View=rism&id=${rismid}`;
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${url}">RISM</a>`;
		output += "</div>";
	}

	// VIAF link:
	let viaf = info["VIAF"];
	let url = `https://viaf.org/viaf/${viaf}`;
	if (viaf) {
		viaf = viaf.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${url}">VIAF</a>`;
		output += "</div>";
	}

	// Wikidata link:
	let wikidata = info["URL-COM-wikidata"];
	if (wikidata) {
		wikidata = wikidata.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${wikidata}">Wikidata</a>`;
		output += "</div>";
	}

	// Wikipedia link:
	let wikipedia = "";
	if (this.VARS.LANGUAGE === "PL") {
		wikipedia = info["URL-COM-wikipedia@PL"];
	}
	if (!wikipedia) {
		wikipedia = info["URL-COM-wikipedia@EN"];
	}
	if (!wikipedia) {
		wikipedia = info["URL-COM-wikipedia"];
	}
	if (wikipedia) {
		wikipedia = wikipedia.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${wikipedia}">Wikipedia</a>`;
		output += "</div>";
	}

	// Worldcat link:
	let worldcat = info["URL-COM-worldcat"];
	if (worldcat) {
		worldcat = worldcat.trim();
		output += "<div class='composer-link'>";
		output += `<a target="_blank" href="${worldcat}">Worldcat</a>`;
		output += "</div>";
	}



	return output;
};

Object.defineProperty(POPC2.prototype.getComposerLinks, "name", { value: "getComposerLinks" });



