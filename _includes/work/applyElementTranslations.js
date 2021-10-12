{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:55:01 PDT 2021
// Last Modified: Mon Oct 11 22:55:06 PDT 2021
// Filename:      _includes/work/applyElementTranslations.js
// Used by:       _includes/work/displayWorkPage.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Search for all elements that contain a .translation class.
//                Then extract the translation tag from the translation dataset
//                entry for the element and insert the translation into the
//                .innerHTML content of the element.
//
{% endcomment %}

POPC2.prototype.applyElementTranslations = function () {
	this.DebugMessageFunction();
	
	let list = document.querySelectorAll(".translation");
	for (let i=0; i<list.length; i++) {
		let tag = list[i].dataset.translation;
		if (!tag) {
			continue;
		}
		let translation = this.getTranslation(tag);
		list[i].innerHTML = translation;
	}
};

Object.defineProperty(POPC2.prototype.applyElementTranslations, "name", { value: "applyElementTranslations" });



