{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon May 30 23:19:02 PDT 2022
// Last Modified: Mon May 30 23:19:04 PDT 2022
// Filename:      _includes/shared/GetComposerDates.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Convert Humdrum CDT reference record into Composer dates.
//
{% endcomment %}

POPC2.prototype.GetComposerDates = function (composer) {
	this.DebugMessageFunction(composer);
	let entry = this.VARS.COMPOSER_INDEX[composer];
	if (!entry) {
		return "";
	}
	let birth = entry.Birth || "";
	let death = entry.Death || "";
	if (!birth && !death) {
		return "";
	}
	if (birth.match(/^\s*$/) && death.match(/^\s*$/)) {
		return "";
	}

	let matches1 = birth.match(/^<(\d{4})/);
	let matches2 = death.match(/^>(\d{4})/);
	if (matches1 && matches2) {
		return `<i>fl.</i> ${matches1[1]}&ndash;${matches2[1]}`;
	}

	matches1 = birth.match(/^(\d{4})\b/);
	matches2 = death.match(/^(\d{4})\b/);
	if (matches1 && matches2) {
		return `${matches1[1]}&ndash;${matches2[1]}`;
	}

	matches1 = birth.match(/^[<>=]?~(\d{4})\b/);
	matches2 = death.match(/^[<>=]?~(\d{4})\b/);
	if (matches1 && matches2) {
		let date1 = parseInt(matches1[1]);
		let date2 = parseInt(matches2[1]);
		let age = date2 - date1;
		let matches3 = matches1[1].match(/(\d\d)00/);
		if ((age == 99) && matches3) {
			return `${matches3[1]}th century`;
		} else {
			return `<i>c.</i> ${matches1[1]} &ndash; <i>c.</i> ${matches2[1]}`;
		}
	}

	matches1 = birth.match(/^[<>=]?~(\d{4})\b/);
	matches2 = death.match(/^(\d{4})\b/);
	if (matches1 && matches2) {
		return `<i>c.</i> ${matches1[1]} &ndash; ${matches2[1]}`;
	}

	matches1 = birth.match(/^(\d{4})\b/);
	matches2 = death.match(/^[<>=]?~(\d{4})\b/);
	if (matches1 && matches2) {
		return `<i>c.</i> ${matches1[1]} &ndash; <i>c.</i> ${matches2[1]}`;
	}

	matches1 = birth.match(/^~(\d{4})\b/);
	matches2 = death.match(/^[<>=]?(\d{4})\b/);
	if (matches1 && matches2) {
		return `<i>c.</i> ${matches1[1]} &ndash; <i>c.</i> ${matches2[1]}`;
	}


	return "";

};

Object.defineProperty(POPC2.prototype.GetComposerDates, "name", { value: "GetComposerDates" });



