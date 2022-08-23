{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug 23 19:28:03 CEST 2022
// Last Modified: Tue Aug 23 19:28:05 CEST 2022
// Filename:      _includes/work/makeNotationOrginal.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display score in diplomatic format (do not apply modernization).
//
{% endcomment %}

POPC2.prototype.makeNotationModern = function () {
	this.DebugMessageFunction();
	if (!this.VARS.MODERNIZE) {
		this.VARS.MODERNIZE = true;
		let id = this.VARS.WORK_ID;
		this.displayScore(id, true);
	}
	// show the "M" icon on the work toolbar and also hide the "O" icon.
	let melement = document.querySelector("#modern-button");
	let oelement = document.querySelector("#original-button");
	if (melement && oelement) {
		melement.classList.remove("hidden");
		oelement.classList.add("hidden");
	}
};

Object.defineProperty(POPC2.prototype.makeNotationModern, "name", { value: "makeNotationModern" });



