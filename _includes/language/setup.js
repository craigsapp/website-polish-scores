// vim: ts=3
//
// Set the display language for the website.  If the user has previously
// visited the website, the preferred language will be stored in
// localStorage.LANGUAGE.  If this is the first time visiting the page,
// The language of the web browser will be chosen as the default language.
//

{% if site.debug == "true" %}
	console.log("SETTING UP LANGUAGE");
{% endif %}

if (localStorage.LANGUAGE) {
	GLOBAL.LANGUAGE = localStorage.LANGUAGE;
}

if (!GLOBAL.LANGUAGE) {
	if (navigator.language.match(/\ben\b/)) {
		GLOBAL.LANGUAGE = "EN";
	} else if (navigator.language.match(/\bpl\b/)) {
		GLOBAL.LANGUAGE = "PL";
	} else {
		GLOBAL.LANGUAGE = "EN";
	}
}

localStorage.LANGUAGE = GLOBAL.LANGUAGE;

{% if site.debug == "true" %}
	console.log("LEAVING LANGUAGE SETUP");
{% endif %}



