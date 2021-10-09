{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/getShelfmarkContent.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Create HTML markup for "siglum: shelfmark"
//                to display in the browse table.
//
{% endcomment %}

POPC2.prototype.getShelfmarkContent = function (siglum, shelfmark) {
	let lowshelf = siglum.toLowerCase();
	let output = "";
	output += "<span"
	output += ` title="${this.getTranslation(lowshelf)}"`;
	output += " class='siglum'>";
	output += `${siglum}`;
	output += "</span>";
	output += `<span class='siglum-postfix'>: `;
	output += `<span class='shelfmark'>${shelfmark}</span>`;
	return output;
};



