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
		let translation = this.getTranslation(newtag);
		list[i][attribute] = translation;
	}

};

Object.defineProperty(POPC2.prototype.ApplyElementTranslations, "name", { value: "ApplyElementTranslations" });



