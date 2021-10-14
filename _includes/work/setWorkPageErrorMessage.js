{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 16:05:00 PDT 2021
// Last Modified: Thu Oct 14 16:05:03 PDT 2021
// Filename:      _includes/work/setWorkPageErrorMessage.js
// Used by:       _indcludes/work/displayWorkInfo.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer and title above a score.
//                Change this to get the composer/title info
//                from the Humdrum file rather than the score index.
//
{% endcomment %}

POPC2.prototype.setWorkPageErrorMessage = function(message, selector) {
	this.DebugMessageFunction();

	if (!selector) {
		selector = "h1";
	}
	let element = document.querySelector(selector);
	if (element) {
		element.innerHTML = message;
	} else {
		console.error(message);
	}
};

Object.defineProperty(POPC2.prototype.setWorkPageErrorMessage, "name", { value: "setWorkPageErrorMessage" });



