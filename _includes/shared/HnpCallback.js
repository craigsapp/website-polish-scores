{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 20:08:53 PDT 2021
// Last Modified: Tue Oct 12 20:08:56 PDT 2021
// Filename:      _includes/shared/hnpCallback.js
// Used by:       displayHumdrum
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Post-verovio actions after SVG of notation is rendered.
//
{% endcomment %}

POPC2.prototype.HnpCallback = function () {
	this.DebugMessageFunction();

	document.body.classList.remove("waiting");
	setTimeout(function() {
 		document.body.classList.remove("waiting");
	}, 80);
	setTimeout(function() {
 		document.body.classList.remove("waiting");
	}, 85);
	setTimeout(function() {
 		document.body.classList.remove("waiting");
	}, 95);
	setTimeout(function() {
 		document.body.classList.remove("waiting");
	}, 120);

};

Object.defineProperty(POPC2.prototype.HnpCallback, "name", { value: "HnpCallback" });



