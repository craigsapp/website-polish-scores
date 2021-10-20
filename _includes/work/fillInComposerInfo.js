{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 07:07:58 PDT 2021
// Last Modified: Tue Oct 19 07:08:01 PDT 2021
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
	if (composer.match(/^anon/i)) {
		element.innerHTML = "";
		return;
	}

	this.displayComposerBrowsePortrait(composer, "#composer-info");
};

Object.defineProperty(POPC2.prototype.fillInComposerInfo, "name", { value: "fillInComposerInfo" });



