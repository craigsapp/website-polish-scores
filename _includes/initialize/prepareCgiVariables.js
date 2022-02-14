{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 10:32:14 PDT 2021
// Last Modified: Mon Oct 11 18:29:32 PDT 2021
// Filename:      _includes/initialize/prepareCgiVariables.js
// Used by:       _includes/initialize/main.html
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Returns an associative array containing the
//                page's URL's CGI parameters, expanded to full names.
//
//   Short   Meaning
//  -------------------------------------------
//    k      Show keyscape on work pages.
//    k=c    Show cleaned keyscape on work pages.
//    k=r    Show relative keyscape on work pages.
//    k=rc   Show relative and cleaned keyscape on work pages.
//    k=cr   Show cleaned and relative keyscape on work pages.
//
// For y, c, s, n, and g, the string must match exactly one of the select options.
//
{% endcomment %}

POPC2.prototype.prepareCgiVariables = function () {
	this.DebugMessageFunction();
	let cgi = this.VARS.CGI;
	if (!cgi) {
		return;
	}

	if (typeof cgi.k !== "undefined") {
		// show keyscape on workpages
		// Off by default so initial toggling should make visible
		if (cgi.k.match(/r/)) {
			// Check the relative keyscape checkbox:
			let relement = document.querySelector("#checkbox-relative");
			if (relement) {
				relement.checked = true;
			}
		}
		if (cgi.k.match(/c/)) {
			// Check the cleaned keyscape checkbox:
			let celement = document.querySelector("#checkbox-cleaned");
			if (celement) {
				celement.checked = true;
			}
		}

		// The keyscape needs to be displayed last so that
		// only one keyscape image is downloaded and displayed
		// initially.
		popc2.toggleSubpageDisplay('keyscape')
	}

};

Object.defineProperty(POPC2.prototype.prepareCgiVariables, "name", { value: "prepareCgiVariables" });



