{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug  9 18:16:08 CEST 2022
// Last Modified: Tue Aug  9 18:16:11 CEST 2022
// Filename:      _includes/work/processHumdrumRecordsForWorkPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display Humdrum reference record information on work page.
//                This presumes that metadata from main index has already
//                been prepared.
//
{% endcomment %}

POPC2.prototype.processHumdrumRecordsForWorkPage = function(entry) {
	this.DebugMessageFunction();

	// Create a link to RISM source
	let element = document.querySelector("#work-shelfmark");
	let nifcrism = entry.humdrum["NIFC-rismSourceID"];
	// If nifcrism is empty, check older alias for parameter name:
	if (!nifcrism) { nifcrism = entry.humdrum["NIFC-rismid"]; }
	if (nifcrism) {
		nifcrism = nifcrism[0].value;
		if (!nifcrism.match(/^[0-9]+$/)) {
			nifcrism = "";
		}
	}
	if (element && nifcrism) {
		let shelfmark = element.querySelector("span.shelfmark");
		let output = `<span class="trans ssm" data-transatt="title:click_rism_siglum" >`
		if (shelfmark) {
			shelfmark.classList.add("trans");
			shelfmark.dataset.transatt = "title:click_rism_source";
			let text = shelfmark.innerHTML;
			if (!text.match(/<a/)) {
				let url = `https://rism.online/sources/${nifcrism}`;
				text = `<a target="_blank" href="${url}">${text}</a>`;
				shelfmark.innerHTML = text;
				this.ApplyElementTranslations(element);
			}
		}
	}

};

Object.defineProperty(POPC2.prototype.processHumdrumRecordsForWorkPage, "name", { value: "processHumdrumRecordsForWorkPage" });



