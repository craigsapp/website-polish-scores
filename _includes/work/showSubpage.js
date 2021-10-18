{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 18 10:38:54 PDT 2021
// Last Modified: Mon Oct 18 10:38:57 PDT 2021
// Filename:      _includes/shared/showSubpage.js
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

POPC2.prototype.showSubpage = function (type) {
	this.DebugMessageFunction(type);
	targets = document.querySelectorAll("#content .subpage");
	let element = null;
	for (let i=0; i<targets.length; i++) {
		if (targets[i].id === "subpage-" + type) {
			targets[i].classList.remove("hidden");
			element = targets[i];
		} else {
			targets[i].classList.add("hidden");
		}
	}
	return element;
};

Object.defineProperty(POPC2.prototype.showSubpage, "name", { value: "showSubpage" });



