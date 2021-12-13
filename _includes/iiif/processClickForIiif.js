{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Dec  4 13:31:16 CET 2021
// Last Modified: Sun Dec 12 08:13:27 CET 2021
// Filename:      _includes/iiif/processClickForIiif.js
// Used by:       
// Included in:   _includes/iiif/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Check the element path for a mouse click and 
//                process any IIIF that is active on the current
//                click path.
//
{% endcomment %}

POPC2.prototype.processClickForIiif = function (event, path) {
	this.DebugMessageFunction();
	if (!path) {
		return;
	}
	
	let boxinfo = this.getIiifBoundingBoxInfo(path);
	if (!boxinfo) {
		return;
	}
	if (!boxinfo.xywh) {
		return;
	}
	if (!boxinfo.label) {
		return;
	}

	this.getIiifBase(boxinfo, event, this.iiifCallback);

};

Object.defineProperty(POPC2.prototype.processClickForIiif, "name", { value: "processClickForIiif" });



