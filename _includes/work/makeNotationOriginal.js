{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug 23 19:24:16 CEST 2022
// Last Modified: Tue Aug 23 19:24:19 CEST 2022
// Filename:      _includes/work/makeNotationOrginal.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display score in diplomatic format (do not apply modernization).
//
{% endcomment %}

POPC2.prototype.makeNotationOriginal = function () {
	this.DebugMessageFunction();
	if (this.VARS.MODERNIZE) {
		this.VARS.MODERNIZE = false;
		let id = this.VARS.WORK_ID;
		this.displayScore(id, {noscroll: true});
	}
	// show the "M" icon on the work toolbar and also hide the "O" icon.
	let melement = document.querySelector("#modern-button");
	let oelement = document.querySelector("#original-button");
	if (melement && oelement) {
		oelement.classList.remove("hidden");
		melement.classList.add("hidden");
	}
};

Object.defineProperty(POPC2.prototype.makeNotationOriginal, "name", { value: "makeNotationOriginal" });



