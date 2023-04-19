{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 13 00:38:18 PDT 2021
// Last Modified: Wed Oct 13 00:38:21 PDT 2021
// Filename:      _includes/work/makeNotationLarger.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-score and musical incipit views.
//
{% endcomment %}

POPC2.prototype.makeNotationLarger = function () {
	this.DebugMessageFunction();

	if (this.VARS.HNP_OPTIONS.scale) {
		let value = parseFloat(this.VARS.HNP_OPTIONS.scale);
		value *= this.SETTINGS.size_increment;
		if (value > 200) {
			value = 200;
		}
		this.VARS.HNP_OPTIONS.scale = value;

	} else {
		this.VARS.HNP_OPTIONS.scale = 39;
	}

	let id = this.VARS.WORK_ID;
	this.displayScore(id, {noscroll: true});
};

Object.defineProperty(POPC2.prototype.makeNotationLarger, "name", { value: "makeNotationLarger" });



