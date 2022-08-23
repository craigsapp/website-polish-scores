{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:55:01 PDT 2021
// Last Modified: Mon Oct 11 22:55:06 PDT 2021
// Filename:      _includes/shared/ApplyElementTranslations.js
// Used by:       _includes/work/displayWorkPage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Search for all elements that contain a .translation class.
//                Then extract the translation tag from the translation dataset
//                entry for the element and insert the translation into the
//                .innerHTML content of the element.
//
{% endcomment %}

POPC2.prototype.ApplyElementTranslations = function (target) {
	this.DebugMessageFunction();

	let list;
	if (target) {
		list = target.querySelectorAll(".trans");
	} else {
		list = document.querySelectorAll(".trans");
	}

	// Adjust language-contextual links to POPC2 scans:
	for (let i=0; i<list.length; i++) {
		if (!list[i].href) {
			continue;
		}
		let url = list[i].href;
		let matches = url.match(/^(https:\/\/polish.musicsources.pl\/)(pl|en)(\/[^#]*)$/);
		if (matches) {
			let lang = this.VARS.LANGUAGE || "EN";
			lang = lang.toLowerCase();
			let newurl = `${matches[1]}${lang}${matches[3]}`;
			if (!newurl.match(/\/\d+\/\d+\/?$/)) {
				// Add first page to URL (which is now required)
				newurl += "/1";
			}
			newurl += "#nomenu";
			if (newurl !== url) {
				list[i].href = newurl;
			}
		}
	}

	// Apply translations to element text content:
	for (let i=0; i<list.length; i++) {
		let tag = list[i].dataset.trans;
		if (!tag) {
			continue;
		}
		let translation = this.getTranslation(tag);
		list[i].innerHTML = translation;
	}

	// Apply translations to element attributions:
	// Example:
	//    data-transatt="title:tag"
	// this will apply the translation to the title attribute.
	for (let i=0; i<list.length; i++) {
		let tag = list[i].dataset.transatt;
		if (!tag) {
			continue;
		}

		let matches = tag.match(/^([^:]+):(.*)/);
		if (!matches) {
			continue;
		}
		let attribute = matches[1];
		let newtag = matches[2];
		let translation = "";
		matches = newtag.match(/(@[A-Z]{2,3}{.*?\})/g);
		let mm;
		if (matches) {
			// Extract embedded translation:
			let mlang;
			let mtrans;
			for (let i=0; i<matches.length; i++) {
				mm = matches[i].match(/@([A-Z]{2,3})\{(.*?)\}/);
				if (!mm) {
					continue;
				}
				mlang = mm[1];
				mtrans = mm[2];
				if (mlang === this.VARS.LANGAUGE) {
					break;
				}
			}
			if (mlang === this.VARS.LANGUAGE) {
				translation = mtrans;
			} else {
				// Use first listed language:
				mm = matches[0].match(/@([A-Z]{2,3})\{(.*?)\}/);
				translation = mm[2];
			}
		} else {
			translation = this.getTranslation(newtag);
		}
		list[i][attribute] = translation;
	}

};

Object.defineProperty(POPC2.prototype.ApplyElementTranslations, "name", { value: "ApplyElementTranslations" });



