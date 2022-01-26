{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 01:27:14 PDT 2021
// Last Modified: Fri Oct  8 01:27:16 PDT 2021
// Filename:      _includes/shared/DisplayLibraryName.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the full name of a RISM siglum, and a link to library if
//                available.  The function this.ApplyElementTranslations() needs to
//                be called afterwards to select the active language for the name.
//
{% endcomment %}

POPC2.prototype.DisplayLibraryName = function (element, siglum, type) {
	this.DebugMessageFunction();
	if (!element) {
		return;
	}
	if (!siglum) {
		element.innerHTML = "";
		return;
	}
	if (!type) {
		type = "long";
	}

	if (element && this.VARS.SIGLUM_INDEX[siglum]) {
		element.innerHTML = "";
		let tag = `${siglum}_URL`;
		let translation = this.VARS.TRANSLATIONS[tag];
		let hasUrl = false;
		if (translation) {
			if (translation.PL) {
				hasUrl = true;
			} else if (translation.EN) {
				hasUrl = true;
			}
		}
		let output = `<a target="_blank" class="trans" href="" data-trans="${siglum}_Name_${type}" data-transatt="href:${siglum}_URL"></a>`;
		if (!hasUrl) {
			output = `<span class="trans" data-trans="${siglum}_Name_${type}"></span>`;
		}
		element.innerHTML = output;
	} else {
		element.innerHTML = "";
	}

};

Object.defineProperty(POPC2.prototype.DisplayLibraryName, "name", { value: "DisplayLibraryName" });



