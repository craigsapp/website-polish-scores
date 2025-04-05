{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Apr  4 10:45:20 PDT 2025
// Last Modified: Fri Apr  4 10:45:23 PDT 2025
// Filename:      _includes/work/generateYoutubeLinks.js
// Used by:       _includes/work/displayScanInfo.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   If there are any reference records in the Humdrum score
//                !!!URL-youtube, then display youtube icons for each.
//
{% endcomment %}

POPC2.prototype.generateYoutubeLinks = function(youtube) {
	this.DebugMessageFunction();
	let output = "";
	for (let i=0; i<youtube.length; i++) {
		output += `<div title="${youtube[i]['title']}"`;
		output += ` style="color:#b0845f; cursor:pointer; position:relative; font-size:200%; left: 4px; top:-4px;"`;
		output += ` onclick="popc2.openYoutubeLink('${youtube[i]['url']}')"`;
		output += ` class="nav-icon fab fa-youtube"`;
		output += `</div>`;
	}
	return output;
};

Object.defineProperty(POPC2.prototype.generateYoutubeLinks, "name", { value: "generateYoutubeLinks" });



