{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:21:31 PDT 2021
// Last Modified: Wed Oct  6 19:21:37 PDT 2021
// Filename:      _includes/shared/ShowPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the requested page.  Page types are:
//                   browse == the main browse page
//                   work   == the work page (showing music notation for one movement).
//                   analysis == Analysis page.
//                Pages are defined by div elements including the .page class.
//                Showing a page will remove the .hidden class from that page,
//                and add .hidden to all other pages.  The name of the page type
//                is embedded in the ID, such as id="page-browse" for the
//                browse page.
//
{% endcomment %}

POPC2.prototype.ShowPage = function (type) {
	this.DebugMessageFunction(type);
	targets = document.querySelectorAll("#content .page");
	let element = null;
	for (let i=0; i<targets.length; i++) {
		if (targets[i].id === "page-" + type) {
			targets[i].classList.remove("hidden");
			element = targets[i];
		} else {
			targets[i].classList.add("hidden");
		}
	}
	return element;
};

Object.defineProperty(POPC2.prototype.ShowPage, "name", { value: "ShowPage" });



