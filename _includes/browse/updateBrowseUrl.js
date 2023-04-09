{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Apr  9 10:35:33 PDT 2023
// Last Modified: Sun Apr  9 10:35:39 PDT 2023
// Filename:      _includes/browse/updateBrowseUrl.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between more/less browse form style.
//
{% endcomment %}

POPC2.prototype.updateBrowseUrl = function (data) {
	this.DebugMessageFunction();
console.error("DATA FOR URL", data, " +=================================");

	let found = false;
	let url = `${window.location.origin}`;

	for (let property in data) {
		if (data[property]) {
			url += (found ? "&" : "?");
			url += `${property}=${encodeURIComponent(data[property])}`;
			found = true;
		}
	}

	if (url !== window.location.href) {
		window.history.pushState(null, null, url);
	}

};

Object.defineProperty(POPC2.prototype.updateBrowseUrl, "name", { value: "updateBrowseUrl" });



