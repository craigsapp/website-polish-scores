{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Sep  5 11:19:40 CEST 2022
// Last Modified: Mon Sep  5 11:19:43 CEST 2022
// Filename:      _includes/shared/SelectMainDataServer.js
// Used by:       _includes/work/displayBrowsePage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Select the main data server.
//
{% endcomment %}

POPC2.prototype.SelectMainDataServer = function () {
	this.DebugMessageFunction();
	// Select the main data server by default:
	for (p in this.SETTINGS.main_data_server) {
		this.SETTINGS[p] = this.SETTINGS.main_data_server[p];
	}
	console.warn("USING MAIN DATA SERVER:", this.SETTINGS.data_addr);
};

Object.defineProperty(POPC2.prototype.SelectMainDataServer, "name", { value: "SelectMainDataServer" });



