// vim: ts=3
//
// Set the display language for the website.  If the user has previously
// visited the website, the preferred language will be stored in
// localStorag.LANGUAGE.  If this is the first time visiting the page,
// The language of the web browser will be chosen as the default language.
//

{% if site.debug == "true" %}
	console.log("SETTING UP LANGUAGE");
{% endif %}

let LANGUAGE = "";

if (localStorage.LANGUAGE) {
	LANGUAGE = localStorage.LANGUAGE;
}

if (!LANGUAGE) {
	if (navigator.language.match(/\ben\b/)) {
		LANGUAGE = "EN";
	} else if (navigator.language.match(/\bpl\b/)) {
		LANGUAGE = "PL";
	} else {
		LANGUAGE = "EN";
	}
}

localStorage.LANGUAGE = LANGUAGE;

{% if site.debug == "true" %}
	console.log("LEAVING LANGUAGE SETUP");
{% endif %}



