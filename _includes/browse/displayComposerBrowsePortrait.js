{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/showComposerBrowsePortrait.js
// Used by:
// Included in:   _includes/browse/main.html
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

POPC2.prototype.displayComposerBrowsePortrait = function (composer) {
	if (!composer) {
		composer = this.VARS.SEARCH.composer;
	}
	this.DebugMessageFunction(composer);
	let element = document.querySelector("#portrait");
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
	if (!entry.Portrait) {
		// No portrait to display
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
	let output = "";
	if (link) {
		output += `<a target="_blank" href="${link}">`;
	}
	if (this.VARS.PORTRAIT_IMAGES[composer]) {
		output += `<img src="${this.VARS.PORTRAIT_IMAGES[composer]}">`;
	} else {
		output += `<img crossorigin="anonymous" src="${url}">`;
	}
	if (link) {
		output += "</a>";
	}
	output += "<br>";
	output += "<div class='composer-name'>\n";
	let name = composer;
	let years = this.makeComposerDates(entry.Birth, entry.Death);
	let matches = name.match(/([^,]+?)\s*,\s*(.*)\s*$/);
	if (matches) {
		name = matches[2] + " " + matches[1];
	}
	if (link) {
		output += `<a target="_blank" href="${link}">`;
	}
	output += name;
	if (years) {
		output += " (" + years + ")";
	}
	if (link) {
		output += "</a>\n";
	}
	output += "</div>\n";

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

Object.defineProperty(POPC2.prototype.displayComposerBrowsePortrait, "name", { value: "displayComposerBrowsePortrait" });


