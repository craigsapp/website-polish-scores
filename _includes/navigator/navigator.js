// vim: ts=3


//////////////////////////////
//
// addLanguageButtons --
//

function addLanguageButtons(target, languages) {
	{% if site.debug == "true" %}
		console.log("LANGUAGES BUTTONS TO ADD", languages);
	{% endif %}
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
}



//////////////////////////////
//
// highlightLanguage --
//

function highlightLanguage(lang) {
	{% if site.debug %}
		console.log("HIGHLIGHTING LANGUAGE", lang);
	{% endif %}
	if (!isValidLanguage(lang)) {
		return;
	}
	let links = document.querySelectorAll("#language-list .button-language");
	for (let i=0; i<links.length; i++) {
		let text = links[i].textContent;
		if (text === lang) {
			links[i].classList.add("highlight");
		} else {
			links[i].classList.remove("highlight");
		}
	}
}



//////////////////////////////
//
// isValidLanguage --
//

function isValidLanguage(lang) {
	let validLanguages = {{ site.languages | jsonify }};
	for (let i=0; i<validLanguages.length; i++) {
		if (lang === validLanguages[i]) {
			return true;
		}
	}
	{% if site.debug %}
		console.log("Unknown language:", lang);
	{% endif %}
	return false;
}



//////////////////////////////
//
// changeToLanguage --
//

function changeToLanguage(lang) {
	if (!isValidLanguage(lang)) {
		return;
	}
	highlightLanguage(lang);
	LANGUAGE = lang;
	localStorage.LANGUAGE = lang;

	// Change current page to given langauge

	// Currently only update browse page:
	displayBrowsePage();


}



