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

		case "b":
			if (popc2.IsWorkPage()) {
				// Display browse page (return from work page)
				popc2.displayBrowsePage();
				event.preventDefault();
			}
			break;

		case "d":
			if (popc2.IsWorkPage()) {
				// Toggle display of download menu.
				popc2.toggleDownloadDisplay();
				event.preventDefault();
			}
			break;

		case "i":
			if (popc2.IsWorkPage()) {
				// Toggle view of full score or first system (incipit).
				popc2.toggleMusicIncipit();
				event.preventDefault();
			}
			break;

		case "l":
			if (popc2.IsWorkPage()) {
				// Copy URL to currently viewed score.
				popc2.copyWorkLink();
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

		case "r":
			if (popc2.VARS.SEARCH_RESULTS.length > 1) {
				if (popc2.IsWorkPage()) {
					// Display a random score.
					popc2.displayScore("random");
					event.preventDefault();
				} else {
					popc2.displayWorkPage("random");
					event.preventDefault();
				}
			}
			break;

		case "v":
			if (popc2.IsWorkPage()) {
				// Open score in VHV.
				popc2.openInVhv();
				event.preventDefault();
			}
			break;

		case "w":
			if (popc2.IsBrowsePage()) {
				if (popc2.VARS.WORK_ID) {
					// Display the work page (with the last viewed score)
					popc2.displayWorkPage();
					event.preventDefault();
				}
			}
			break;

		case "0":
			// Reset the notation scale to the default value.
			// Try also meta-0, which rescales the notation as well
			// as the page size via the browser.
			popc2.VARS.HNP_OPTIONS.scale = 39;
			if (popc2.IsWorkPage()) {
				popc2.displayScore();
			}
			// Do not call event.preventDefault.
			break;

		case "ArrowRight":
			if (popc2.IsWorkPage() && (popc2.VARS.SEARCH_RESULTS.length > 1)) {
				// Display the next score.
				popc2.displayNextWork();
				event.preventDefault();
			}
			break;

		case "ArrowLeft":
			if (popc2.IsWorkPage() && (popc2.VARS.SEARCH_RESULTS.length > 1)) {
				// Display the previous score.
				popc2.displayPreviousWork();
				event.preventDefault();
			}
			break;

		case "ArrowUp":
			if (popc2.IsWorkPage()) {
				if (event.shiftKey) {
					// Go to the top of the page.
					window.scrollTo(0, 0);
					event.preventDefault();
				}
			}
			break;

		case "ArrowDown":
			if (popc2.IsWorkPage()) {
				let element = document.querySelector("footer");
				if (element) {
					element.scrollIntoView();
					event.preventDefault();
				}
			}
			break;

		case " ":
			if (popc2.IsWorkPage()) {
				console.warn("Going to toggle MIDI playback in future.");
				event.preventDefault();
			}
			break;

		case "-":
			if (popc2.IsWorkPage()) {
				// Make music notation smaller.
				popc2.makeNotationSmaller();
				event.preventDefault();
			}
			break;

		case "+":
		case "=":
			if (popc2.IsWorkPage()) {
				// Make music notation larger.
				popc2.makeNotationLarger();
				event.preventDefault();
			}
			break;

	}
};

Object.defineProperty(POPC2.prototype.processKeyboardCommand, "name", { value: "processKeyboardCommand" });


