{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 19:32:27 PDT 2021
// Last Modified: Wed Nov  3 19:32:29 PDT 2021
// Filename:      _includes/analysis/downloadPitchRangePlot.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download pitch range plot SVG image.
//
{% endcomment %}

POPC2.prototype.downloadPitchRangePlot = function (options) {
	this.DebugMessageFunction();

	element = document.querySelector("#prange-content");
	if (!element) {
		return;
	}
	// This will work unless the <svg> is wrapped later in another element.
	contents = element.innerHTML;
	console.log("SVG", contents);
	// Assume XXX contains your SVG content

	let blob = new Blob([contents], { type: 'image/svg+xml' });
	let link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	let name = popc2.VARS.WORK_ID + "-prange.svg";
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

};

Object.defineProperty(POPC2.prototype.downloadPitchRangePlot, "name", { value: "downloadPitchRangePlot" });



