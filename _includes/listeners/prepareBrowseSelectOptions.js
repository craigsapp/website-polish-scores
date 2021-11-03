{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 10 09:45:29 PDT 2021
// Last Modified: Sun Oct 10 09:45:37 PDT 2021
// Filename:      _includes/listeners/prepareBrowseSelectOptions.js
// Used by:       _includes/listeners/downloadScoreIndex.js
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Collate all values for parameters in the score index that
//                are used to create options for the select menus on the browse
//                page.
//
{% endcomment %}

POPC2.prototype.prepareBrowseSelectOptions = function () {
	this.DebugMessageFunction();

	this.VARS.BROWSE_MENU_OPTIONS = {};
	let data = this.VARS.BROWSE_MENU_OPTIONS;
	data.composer    = {};
	data.century     = {};
	data.siglum      = {};
	data.genre       = {};
	data.nationality = {};

	let index = this.VARS.SEARCH_INDEX;
	for (let i=0; i<index.length; i++) {
		let entry = index[i];
		let composer    = entry.COM    || "";
		let century     = entry.cenid  || "";
		let siglum      = entry.siglum || "";
		let genre       = entry.AGN    || "";
		let nationality = entry.CNT    || "";
		if (century) {
			century = century.replace(/:.*/, "");
			if (!century.match(/^1[5678]xx$/)) {
				console.warn("Unknown century option being ignored:", century);
				century = "";
			}
		}
		if (composer) {
			if (data.composer[composer]) {
				data.composer[composer]++;
			} else {
				data.composer[composer] = 1;
			}
		}
		if (century) {
			if (data.century[century]) {
				data.century[century]++;
			} else {
				data.century[century] = 1;
			}
		}
		if (siglum) {
			if (data.siglum[siglum]) {
				data.siglum[siglum]++;
			} else {
				data.siglum[siglum] = 1;
			}
		}
		if (genre) {
			genre = genre.trim();
			pieces = genre.split(/\s*;\s*/);
			for (let j=0; j<pieces.length; j++) {
				if (!data.genre[pieces[j]]) {
					data.genre[pieces[j]] = 1;
				} else {
					data.genre[pieces[j]]++;
				}
			}
		}
		if (nationality) {
			if (data.nationality[nationality]) {
				data.nationality[nationality]++;
			} else {
				data.nationality[nationality] = 1;
			}
		}
	}
};

Object.defineProperty(POPC2.prototype.prepareBrowseSelectOptions, "name", { value: "prepareBrowseSelectOptions" });



