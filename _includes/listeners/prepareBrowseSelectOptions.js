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
	data.instrument  = {};
	data.genre       = {};
	data.tonic       = {};
	data.mode        = {};
	data.nationality = {};

	let index = this.VARS.SEARCH_INDEX;
	for (let i=0; i<index.length; i++) {
		let entry = index[i];
		let composer    = entry.COM        || "";
		let century     = entry.cenid      || "";
		let siglum      = entry.siglum     || "";
		let ain         = entry.AIN        || "";
		let genre       = entry.AGN        || "";
		let key         = entry.key        || "";
		let nationality = entry.CNT        || "";
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
		if (ain) {
			let ains = ain.split(/\s+/);
			for (let j=0; j<ains.length; j++) {
				if (ains[j].match(/^[a-z]/)) {
					if (ains[j] === "empty") {
						continue;
					}
					if (data.instrument[ains[j]]) {
						data.instrument[ains[j]]++;
					} else {
						data.instrument[ains[j]] = 1;
					}
				}
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

		if (key) {
			key = key.trim();
			let matches;
			if (matches = key.match(/^([^:]+)/)) {
				let tonic = matches[1].toUpperCase();
				if (!data.tonic[tonic]) {
					data.tonic[tonic] = 1;
				} else {
					data.tonic[tonic]++;
				}
			}
		}

		if (key) {
			let matches;

			if (matches = key.match(/:ion$/)) {
				if (!data.mode["ion"]) {
					data.mode["ion"] = 1;
				} else {
					data.mode["ion"]++;
				}
			} else if (matches = key.match(/:dor$/)) {
				if (!data.mode["dor"]) {
					data.mode["dor"] = 1;
				} else {
					data.mode["dor"]++;
				}
			} else if (matches = key.match(/:phr$/)) {
				if (!data.mode["phr"]) {
					data.mode["phr"] = 1;
				} else {
					data.mode["phr"]++;
				}
			} else if (matches = key.match(/:lyd$/)) {
				if (!data.mode["lyd"]) {
					data.mode["lyd"] = 1;
				} else {
					data.mode["lyd"]++;
				}
			} else if (matches = key.match(/:mix$/)) {
				if (!data.mode["mix"]) {
					data.mode["mix"] = 1;
				} else {
					data.mode["mix"]++;
				}
			} else if (matches = key.match(/:aeo$/)) {
				if (!data.mode["aeo"]) {
					data.mode["aeo"] = 1;
				} else {
					data.mode["aeo"]++;
				}
			} else if (matches = key.match(/:loc$/)) {
				if (!data.mode["loc"]) {
					data.mode["loc"] = 1;
				} else {
					data.mode["loc"]++;
				}
			} else if (matches = key.match(/^([A-G])/)) {
				if (!data.mode["maj"]) {
					data.mode["maj"] = 1;
				} else {
					data.mode["maj"]++;
				}
			} else if (matches = key.match(/^([a-g])/)) {
				if (!data.mode["min"]) {
					data.mode["min"] = 1;
				} else {
					data.mode["min"]++;
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



