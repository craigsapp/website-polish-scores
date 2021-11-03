{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:30:44 PDT 2021
// Last Modified: Mon Oct 11 22:30:46 PDT 2021
// Filename:      _includes/work/getRandomWorkId.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display work navigator in the top left corner of the
//                webpages.  Only display next/previous text if there is
//                at least two entries in the SEARCH_RESULTS list.
//
{% endcomment %}

POPC2.prototype.getRandomWorkId = function(index) {
	this.DebugMessageFunction();

	if (!index) {
		index = this.VARS.SEARCH_RESULTS;
	}
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}
	let random_value = Math.floor(Math.random() * index.length)
	let id = index[random_value].fileid;
	if (!id) {
		id = index[random_value].cenid;
	}
	if (!id) {
		this.VARS.SEARCH_INDEX[0];
	}
	if (!id) {
		id = "18xx:105";
	}
	return id;
};

Object.defineProperty(POPC2.prototype.getRandomWorkId, "name", { value: "getRandomWorkId" });



