{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 20:50:31 PDT 2021
// Last Modified: Sat Oct 16 17:05:46 PDT 2021
// Filename:      _includes/browse/toggleBrowseStyle.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between more/less browse form style.
//
{% endcomment %}

POPC2.prototype.toggleBrowseStyle = function () {
	this.DebugMessageFunction();
	let current = this.VARS.BROWSE_STYLE;
	if (current === "more") {
		current = "less";
	} else {
		current = "more";
	}
	this.VARS.BROWSE_STYLE = current;
	localStorage.BROWSE_STYLE = current;

	if (current === "more") {
		this.showBrowseMore();
		this.showShelfmarkColumn();
	} else {
		this.showBrowseLess();
		this.hideShelfmarkColumn();
	}
};

Object.defineProperty(POPC2.prototype.toggleBrowseStyle, "name", { value: "toggleBrowseStyle" });



