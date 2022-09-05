{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Sep  5 11:17:03 CEST 2022
// Last Modified: Mon Sep  5 11:17:05 CEST 2022
// Filename:      _includes/shared/SelectMirrorDataServer.js
// Used by:       _includes/work/displayBrowsePage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Select the mirror data server.
//
{% endcomment %}

POPC2.prototype.SelectMirrorDataServer = function () {
	this.DebugMessageFunction();
	// Select the main data server by default:
	for (p in this.SETTINGS.mirror_data_server) {
		this.SETTINGS[p] = this.SETTINGS.mirror_data_server[p];
	}
	console.warn("USING MIRROR DATA SERVER:", this.SETTINGS.data_addr);
};

Object.defineProperty(POPC2.prototype.SelectMirrorDataServer, "name", { value: "SelectMirrorDataServer" });



