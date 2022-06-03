{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Mon Apr  4 19:06:02 PDT 2022
// Filename:      _includes/work/displayWorkPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Make the work page visible and display the requested work on the page.
//
{% endcomment %}

POPC2.prototype.displayWorkPage = function (id) {
	this.DebugMessageFunction(id);
	if (!id) {
		id = this.VARS.WORK_ID;
	}
	this.VARS.WORK_ID = id;
	this.ShowPage("work");
	this.ShowWebsiteTitle();
	this.insertBrowseSearchOnWorkPage();
	this.HideIiifLogo();
	this.displayScore(id);
	if (this.VARS.RESTORE_TOOLS) {
		this.VARS.RESTORE_TOOLS = false;
		let element = document.querySelector("#tools");
		if (element) {
			element.classList.remove("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.displayWorkPage, "name", { value: "displayWorkPage" });



