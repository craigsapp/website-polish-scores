{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/addLanguageButtons.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display a list of language on the top right side
//                of the main contents of the page.
//
{% endcomment %}

POPC2.prototype.addLanguageButtons = function (target, languages) {
	this.DebugMessageFunction(target, JSON.stringify(languages));
	if (!target) {
		target = "#language-list";
	}
	let element = document.querySelector(target);
	if (!element) {
		console.log("ERROR: target", target, "does not exist");
		return;
	}
	let output = "";
	for (let i=0; i<languages.length; i++) {
		languageTitle = "";
		if (languages[i] === "EN") {
			languageTitle = "View webpage in English";
		} else if (languages[i] === "PL") {
			languageTitle = "Zobacz stronę w języku polskim";
		}
		output += `<div title="${languageTitle}" class="button-language">${languages[i]}</div>\n`;
	}
	element.innerHTML = output;
};

Object.defineProperty(POPC2.prototype.addLanguageButtons, "name", { value: "addLanguageButtons" });



