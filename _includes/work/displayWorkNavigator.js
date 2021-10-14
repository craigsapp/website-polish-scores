{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:30:44 PDT 2021
// Last Modified: Tue Oct 12 10:56:20 PDT 2021
// Filename:      _includes/work/displayWorkNavigator.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display work navigator in the top left corner of the
//                webpages.  Only display next/previous text if there is
//                at least two entries in the SEARCH_RESULTS list.
//
{% endcomment %}

POPC2.prototype.displayWorkNavigator = function() {
	this.DebugMessageFunction();

	let element = document.querySelector("header");
	if (element) {
		element.style.display = "block";
	}

	element = document.querySelector("#work-navigator");
	if (element) {
		element.style.visibility = "visible";
	}

	element = document.querySelector("#to-browse-page");
	if (element) {
		element.style.visibility = "visible";
	}

	if (this.VARS.SEARCH_RESULTS && this.VARS.SEARCH_RESULTS.length > 1) {
		element = document.querySelector("#previous-work");
		if (element) {
			element.style.visibility = "visible";
		}
		element = document.querySelector("#next-work");
		if (element) {
			element.style.visibility = "visible";
		}
	} else {
		element = document.querySelector("#previous-work");
		if (element) {
			element.style.visibility = "hidden";
		}
		element = document.querySelector("#next-work");
		if (element) {
			element.style.visibility = "hidden";
		}
	}

};

Object.defineProperty(POPC2.prototype.displayWorkNavigator, "name", { value: "displayWorkNavigator" });



