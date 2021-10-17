{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 23:39:37 PDT 2021
// Last Modified: Thu Oct 14 23:39:40 PDT 2021
// Filename:      _includes/listeners/processKeyboardCommand.js
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Event handler for key presses.
//
{% endcomment %}

POPC2.prototype.processKeyboardCommand = function (event) {
	if (!event) {
		return;
	}
	if (!event.preventDefault) {
		// Added if needed for dummy events.
		event.preventDefault = function() { };
	}

	if (event.metaKey) {
		// usually ignore metaKey unless 0:
		if (event.key == "0") {
			// reset notation options.
			popc2.VARS.HNP_OPTIONS.scale = 39;
			if (popc2.IsWorkPage()) {
				popc2.displayScore();
			}	
			// not preventingDefault so that web browser can reset size as well.
		}
		return;
	}

	switch (event.key) {

		case "d":
			if (popc2.IsWorkPage()) {
				popc2.toggleDownloadDisplay();
				event.preventDefault();
			}
			break;

		case "p":
			if (popc2.IsWorkPage()) {
				if (popc2.VARS.PROBLEM_TEXT) {
					popc2.VARS.PROBLEM_TEXT = false;;
				} else {
					popc2.VARS.PROBLEM_TEXT = true;
				}
				let element = document.querySelector("#notation svg");
				if (element) {
					element.setAttribute("data-random", Math.random());
				}
				event.preventDefault();
			}
			break;

	}

};


