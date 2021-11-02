{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Thu Oct 21 01:44:14 PDT 2021
// Filename:      _includes/browse/displayComposerInfoPortrait.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer portrait in the VARS.SEARCH.composer
//                field if there is one; otherwise, hide the #portrait element.
//                Portraits are loaded from a url stored in the .Portrait parameter
//                of an entry in VARS.COMPOSER_INDEX.  The code checks data-composer
//                parameter of the #portrait element and will update the
//                portrait if needed.  A portrait will only be displayed if
//                a specific composer is selected in the browse select menu, and
//                portraits will also only be displayed if there is a URL for a
//                portrait.
//
//                Once the portrait image is downloaded, it will be stored in
//                VARS.PORTRAIT_IMAGES for faster loading of the image when the
//                browse page is redrawn (such as when changing languages).
//
{% endcomment %}

POPC2.prototype.DisplayComposerInfoPortrait = function (composer, selector) {

	if (!composer) {
		composer = this.VARS.SEARCH.composer;
	}
	this.DebugMessageFunction(composer);
	if (!selector) {
		selector = "#portrait-browse";
	}
	let inbrowse = selector.match(/portrait/i);
	let element = document.querySelector(selector);
	if (!element) {
		return;
	}
	if (!composer) {
		element.style.display = "none";
		return;
	}
	if (element.dataset.composer === composer) {
		// The composer is already displayed, so don't do anything,
		// except ensure that the portrait is visible:
		element.style.display = "block";
		return;
	}

	let entry = this.VARS.COMPOSER_INDEX[composer];
	if (!entry) {
		element.style.display = "none";
		return;
	}

	let url = entry.Portrait;

	let link = "";
	if (this.VARS.LANGUAGE === "PL") {
		if (entry["URL-COM-wikipedia@PL"]) {
			link = entry["URL-COM-wikipedia@PL"];
		} else if (entry["URL-COM-wikipedia@EN"]) {
			link = entry["URL-COM-wikipedia@EN"];
		} else {
			link = entry["URL-COM-wikipedia"];
		}
	} else {
		if (entry["URL-COM-wikipedia@EN"]) {
			link = entry["URL-COM-wikipedia@EN"];
		} else if (entry["URL-COM-wikipedia@PL"]) {
			link = entry["URL-COM-wikipedia@PL"];
		} else {
			link = entry["URL-COM-wikipedia"];
		}
	}
	link = link || "";
	let output = "<center>\n";

	if (inbrowse) {
		output += "<div class='composer-name'>\n";
		let name = composer;
		let years = this.MakeComposerDates(entry.Birth, entry.Death);
		let matches = name.match(/([^,]+?)\s*,\s*(.*)\s*$/);
		if (matches) {
			name = matches[2] + " " + matches[1];
		}
		output += name;
		if (years) {
			output += " (" + years + ")";
		}
		output += "</div>\n";
	} else {
		output += "<div class='composer-dates'>\n";
		let years = this.MakeComposerDates(entry.Birth, entry.Death);
		output += years;
		output += "</div>\n";
	}

	if (url) {
		output += "<table id='composer-image-table'>\n";
		output += "<tr><td>";

		output += "<div id='image-wrapper'>\n";
		output += "<center>";
		if (this.VARS.PORTRAIT_IMAGES[composer]) {
			output += `<img src="${this.VARS.PORTRAIT_IMAGES[composer]}">`;
		} else {
			output += `<img crossorigin="anonymous" src="${url}">`;
		}
		output += "</center>";
		output += "</div>\n";

		output += "</td><td>";
	}
	output += this.getComposerLinks(entry);

	if (url) {
		output += "</td></tr>";
		output += "</table>";
	}

	output += "</center>\n";

	if (inbrowse) {
		output += "<br/><br/>";
	}

	element.innerHTML = output;
	element.style.display = "block";
	element.dataset.composer = composer;

	let that = this;

	if (!this.VARS.PORTRAIT_IMAGES[composer]) {
		let imageElement = document.querySelector("#portrait img");
		if (!imageElement) {
			return;
		}
		imageElement.onload = function(event) {
			let encodedImage = that.GetBase64Image(event.currentTarget);
			that.VARS.PORTRAIT_IMAGES[composer] = encodedImage;
		};
	}
};

Object.defineProperty(POPC2.prototype.DisplayComposerInfoPortrait, "name", { value: "DisplayComposerInfoPortrait" });



