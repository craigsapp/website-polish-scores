{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug  9 15:00:52 CEST 2022
// Last Modified: Tue Aug  9 15:00:55 CEST 2022
// Filename:      _includes/work/displayWorkPagination.js
// Used by:       
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer and title above a score.
//                Change this to get the composer/title info
//                from the Humdrum file rather than the score index.
//
{% endcomment %}

POPC2.prototype.displayWorkPagination = function(page) {
	this.DebugMessageFunction();
	console.log("DISPLAYING PAGE", page);

};

Object.defineProperty(POPC2.prototype.displayWorkPagination, "name", { value: "displayWorkPagination" });



