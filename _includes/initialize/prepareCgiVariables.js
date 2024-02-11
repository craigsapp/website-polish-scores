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
//    ks      Show keyscape on work pages.
//    ks=c    Show cleaned keyscape on work pages.
//    ks=r    Show relative keyscape on work pages.
//    ks=rc   Show relative and cleaned keyscape on work pages.
//    ks=cr   Show cleaned and relative keyscape on work pages.
//    config Stores notation configuration options.
//
// For y, c, s, n, i, k, m, and g, the string must match exactly one of the select options.
//
{% endcomment %}

POPC2.prototype.prepareCgiVariables = function () {
	this.DebugMessageFunction();
	let cgi = this.VARS.CGI;
	if (!cgi) {
		return;
	}

	if (typeof cgi.ks !== "undefined") {
		// show keyscape on workpages
		// Off by default so initial toggling should make visible
		if (cgi.ks.match(/r/)) {
			// Check the relative keyscape checkbox:
			let relement = document.querySelector("#checkbox-relative");
			if (relement) {
				relement.checked = true;
			}
		}
		if (cgi.ks.match(/c/)) {
			// Check the cleaned keyscape checkbox:
			let celement = document.querySelector("#checkbox-cleaned");
			if (celement) {
				celement.checked = true;
			}
		}

		// The keyscape needs to be displayed last so that
		// only one keyscape image is downloaded and displayed
		// initially.
		popc2.toggleToolDisplay('keyscape')
	}

	if (typeof cgi.config !== "undefined") {
		popc2.setConfigurationOptions(cgi.config);
	}

	if (cgi.id === "random") {
		this.ShowWaitingCursor();
	}

};

Object.defineProperty(POPC2.prototype.prepareCgiVariables, "name", { value: "prepareCgiVariables" });



