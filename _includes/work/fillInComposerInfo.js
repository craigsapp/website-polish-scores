{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 07:07:58 PDT 2021
// Last Modified: Mon May 30 23:14:33 PDT 2022
// Filename:      _includes/work/fillInComposerInfo.js
// Used by:       _includes/work/displayScore.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display information for given composer.
//
{% endcomment %}

POPC2.prototype.fillInComposerInfo = function(composer) {
	this.DebugMessageFunction(composer);

	let element = document.querySelector("#composer-info");
	if (!element) {
		return;
	}
	let currentComposer = element.dataset.name;
	if (currentComposer === composer) {
		return;
	}
	element.dataset.name = composer;

	let entry = this.VARS.COMPOSER_INDEX[composer];

	// Show composer name
	let composerNameElement = element.querySelector("#composer-name");
	if (composerNameElement && entry.COM) {
		let text = this.FlipName(entry.COM);
		composerNameElement.style.cursor = "auto";
		composerNameElement.innerHTML = text;
		composerNameElement.dataset.name = entry.COM;
	}

	// Show composer dates
	let composerDateElement = document.querySelector("#composer-dates");
	if (composerDateElement) {
		let text = this.GetComposerDates(entry.COM);
		composerDateElement.style.cursor = "auto";
		composerDateElement.innerHTML = text;
		composerDateElement.dataset.name = entry.COM;
	}

	// Show composer links
	let composerLinkElement = document.querySelector("#composer-links");
	if (composerLinkElement) {
		let text = this.getComposerLinks(entry.COM);
		composerLinkElement.style.cursor = "auto";
		composerLinkElement.innerHTML = text;
		composerLinkElement.dataset.name = entry.COM;
	}

	this.DisplayComposerPortrait(composer, "#composer-portrait");
};

Object.defineProperty(POPC2.prototype.fillInComposerInfo, "name", { value: "fillInComposerInfo" });



