{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat May  6 11:23:21 PDT 2023
// Last Modified: Sat May  6 11:58:02 PDT 2023
// Filename:      _includes/browse/getSiglumMatch.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the best match for a siglum CGI input.
//
{% endcomment %}

POPC2.prototype.getSiglumMatch = function (input, index) {
	this.DebugMessageFunctionVerbose();

	if (!input) {
		return "";
	}

	// Convert lower case siglum to capitalized one.
	// Note: if there are accented keys in the full siglum ID,
	// then these will have to be considered.
	let fullKeys = Object.getOwnPropertyNames(this.VARS.BROWSE_MENU_OPTIONS.siglum);

	for (let i=0; i<fullKeys.length; i++) {
		let key = fullKeys[i];
		if (key === input) {
			return key;
		} else if (key.toLowerCase() === input.toLowerCase()) {
			return key;
		}
	}

	// If a match has not been found, assume a PL- prefix:
	for (let i=0; i<fullKeys.length; i++) {
		let key = fullKeys[i];
		if (key.toLowerCase() === "pl=" + input.toLowerCase()) {
			return key;
		}
	}

	// If a match has not been found, assume any country code prefix:
	for (let i=0; i<fullKeys.length; i++) {
		let key = fullKeys[i];
		let searchkey = key.replace(/^[A-Za-z]+-/, "");
		if (searchkey.toLowerCase() === input.toLowerCase()) {
			return key;
		}
	}


	// No matching siglum found.
	return "";

};

Object.defineProperty(POPC2.prototype.getSiglumMatch, "name", { value: "getSiglumMatch" });



