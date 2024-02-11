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

	if (event.altKey) {
		// Cannot handle alt keys below since they generate alternate
		// characters rather than the plain key (example alt-c generates
		// the letter ç on a US keyboard (but could be other letters
		// on other language keyboards.

		if (event.code == "KeyC") {
			// set the default ID style to century IDs.
			this.VARS.ID_STYLE = "cenid";
			// update the URL if viewing a work page.
			let element = document.querySelector("#page-work");
			if (element && !element.classList.contains("hidden")) {
				this.updateWorkUrlDisplay();
			}
			event.preventDefault();
		}

		if (event.code == "KeyF") {
			// set the default ID style to century IDs.
			this.VARS.ID_STYLE = "fileid";
			// update the URL if viewing a work page.
			let element = document.querySelector("#page-work");
			if (element && !element.classList.contains("hidden")) {
				this.updateWorkUrlDisplay();
			}
			event.preventDefault();
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

		case "c":
		case "k":
			if (popc2.IsBrowsePage()) {
				// Toggle display of last edited date entry in browse table.
				if (this.VARS.SEARCH_SORT_TYPE === "composer") {
					let tempval = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE =  this.VARS.SEARCH_SORT_TYPE_LAST;
					this.VARS.SEARCH_SORT_TYPE_LAST = tempval;
				} else {
					this.VARS.SEARCH_SORT_TYPE_LAST = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE = "composer";
				}
				this.displayBrowseTable();
				event.preventDefault();
			}
			break;

		case "d":
			if (popc2.IsBrowsePage()) {
				// Toggle display of last edited date entry in browse table.
				popc2.toggleDateSorting();
				event.preventDefault();
			} else if (popc2.IsWorkPage()) {
				// Toggle display of download menu.
				popc2.toggleToolDisplay("download");
				event.preventDefault();
			}
			break;

		case "f":
			if (popc2.IsWorkPage()) {
				// Toggle display of download menu.
				popc2.toggleFullScreen();
				event.preventDefault();
			}
			break;

		case "i":
			if (popc2.IsWorkPage()) {
				// Toggle view of full score or first system (incipit).
				popc2.toggleMusicIncipit();
				event.preventDefault();
			} else if (popc2.IsBrowsePage()) {
				popc2.toggleIiifScores();
			}
			break;

		case "l":
			if (popc2.IsWorkPage()) {
				// Copy URL to currently viewed score.
				popc2.copyWorkLink();
				event.preventDefault();
			}
			break;

		case "m":
			if (popc2.IsWorkPage()) {
				// View score in modernized form:
				popc2.makeNotationModern();
				event.preventDefault();
			} else if (popc2.IsBrowsePage()) {
				popc2.toggleModernScores();
			}
			break;

		case "n":
			if (popc2.IsBrowsePage()) {
				// Toggle sorting search results in notecount order.
				if ((popc2.VARS.SEARCH_SORT_TYPE === "notecount") && (popc2.VARS.SEARCH_SORT_REVERSE == null)) {
					popc2.VARS.SEARCH_SORT_TYPE = null;
					popc2.VARS.SEARCH_SORT_REVERSE = false;
				} else {
					popc2.VARS.SEARCH_SORT_TYPE = "notecount";
					popc2.VARS.SEARCH_SORT_REVERSE = false;
				}
				popc2.doBrowseSearch();
				event.preventDefault();
			}
			break;

		case "N":
			if (popc2.IsBrowsePage()) {
				// Toggle sorting search results in reverse notecount order.
				if ((popc2.VARS.SEARCH_SORT_TYPE === "notecount") && (popc2.VARS.SEARCH_SORT_REVERSE)) {
					popc2.VARS.SEARCH_SORT_TYPE = null;
					popc2.VARS.SEARCH_SORT_REVERSE = false;
				} else {
					popc2.VARS.SEARCH_SORT_TYPE = "notecount";
					popc2.VARS.SEARCH_SORT_REVERSE = true;
				}
				popc2.doBrowseSearch();
			}
			break;

		case "o":
			if (popc2.IsWorkPage()) {
				// View score in original/diplomatic form:
				popc2.makeNotationOriginal();
				event.preventDefault();
			}
			break;

		case "O":
			popc2.toggleToolOpacity();
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
				popc2.displayRandomWork();
				event.preventDefault();
			}
			break;

		case "s":
			if (popc2.IsBrowsePage()) {
				// Toggle display of last edited date entry in browse table.
				if (this.VARS.SEARCH_SORT_TYPE === "shelfmark") {
					let tempval = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE =  this.VARS.SEARCH_SORT_TYPE_LAST;
					this.VARS.SEARCH_SORT_TYPE_LAST = tempval;
				} else {
					this.VARS.SEARCH_SORT_TYPE_LAST = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE = "shelfmark";
				}
				this.displayBrowseTable();
				event.preventDefault();
			}
			break;

		case "t":
			if (popc2.IsBrowsePage()) {
				// Toggle display of last edited date entry in browse table.
				if (this.VARS.SEARCH_SORT_TYPE === "title") {
					let tempval = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE =  this.VARS.SEARCH_SORT_TYPE_LAST;
					this.VARS.SEARCH_SORT_TYPE_LAST = tempval;
				} else {
					this.VARS.SEARCH_SORT_TYPE_LAST = this.VARS.SEARCH_SORT_TYPE;
					this.VARS.SEARCH_SORT_TYPE = "title";
				}
				this.displayBrowseTable();
				event.preventDefault();
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

		case "x":
			if (popc2.IsBrowsePage()) {
				popc2.VARS.SEARCH_FLAGS.TEXT = !popc2.VARS.SEARCH_FLAGS.TEXT;
				popc2.doBrowseSearch();
				if (popc2.VARS.SEARCH_FLAGS.TEXT) {
					console.warn("Doing lyrical text search");
				} else {
					console.warn("Turning off lyrical text search");
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
				if (event.shiftKey) {
					// Display the next score.
					popc2.displayNextWork();
					event.preventDefault();
				}
			}
			break;

		case "ArrowLeft":
			if (popc2.IsWorkPage() && (popc2.VARS.SEARCH_RESULTS.length > 1)) {
				if (event.shiftKey) {
					// Display the previous score.
					popc2.displayPreviousWork();
					event.preventDefault();
				}
			}
			break;

		case "ArrowUp":
			if (event.shiftKey) {
				// Go to the top of the page.
				window.scrollTo(0, 0);
				event.preventDefault();
			}
			break;

		case "ArrowDown":
			if (event.shiftKey) {
				let element = document.querySelector("footer");
				if (element) {
					element.scrollIntoView();
					event.preventDefault();
				}
			}
			break;

		case " ":
			if (popc2.IsWorkPage()) {
				let player = document.querySelector("#player");
				if (player) {
					playCurrentMidi();
					event.preventDefault();
				}
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

		case "Backspace":
			if (popc2.GetPageType() === "work") {
				popc2.resetWorkSearchFields();
			} else {
				popc2.resetBrowseSearchFields();
			}
			event.preventDefault();
			break;

	}
};

Object.defineProperty(POPC2.prototype.processKeyboardCommand, "name", { value: "processKeyboardCommand" });



