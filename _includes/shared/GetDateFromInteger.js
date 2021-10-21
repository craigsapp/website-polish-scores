{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 10:00:26 PDT 2021
// Last Modified: Thu Oct 21 10:01:13 PDT 2021
// Filename:      _includes/shared/GetDateFromInteger.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the requested page.  Page types are:
//                   browse == the main browse page
//                   work   == the work page (showing music notation for one movement).
//                   analysis == Analysis page.
//                Pages are defined by div elements including the .page class.
//                Showing a page will remove the .hidden class from that page,
//                and add .hidden to all other pages.  The name of the page type
//                is embedded in the ID, such as id="page-browse" for the
//                browse page.
//
{% endcomment %}

POPC2.prototype.GetDateFromInteger = function (number) {
	this.DebugMessageFunctionVerbose(number);
	if (typeof number === "number") {
		number = number.toString();
	}
	if (typeof number !== "string") {
		return "";
	}
	let matches = number.match(/(2\d\d\d)([01]\d)([0123]\d)\b/);
	if (!matches) {
		return "";
	}
	let year = parseInt(matches[1]);
	let month = parseInt(matches[2]);
	let day = parseInt(matches[3]);

	let monthname = "";
	if (this.VARS.LANGUAGE === "PL") {
		switch (month) {
			case  1: monthname = "I";    break;
			case  2: monthname = "II";   break;
			case  3: monthname = "III";  break;
			case  4: monthname = "IV";   break;
			case  5: monthname = "V";    break;
			case  6: monthname = "VI";   break;
			case  7: monthname = "VII";  break;
			case  8: monthname = "VIII"; break;
			case  9: monthname = "IX";   break;
			case 10: monthname = "X";    break;
			case 11: monthname = "XI";   break;
			case 12: monthname = "XII";  break;
		}
	} else {
		switch (month) {
			case  1: monthname = "Jan";  break;
			case  2: monthname = "Feb";  break;
			case  3: monthname = "Mar";  break;
			case  4: monthname = "Apr";  break;
			case  5: monthname = "May";  break;
			case  6: monthname = "Jun";  break;
			case  7: monthname = "Jul";  break;
			case  8: monthname = "Aug";  break;
			case  9: monthname = "Sep";  break;
			case 10: monthname = "Oct";  break;
			case 11: monthname = "Nov";  break;
			case 12: monthname = "Dec";  break;
		}
	}

	if (monthname === "") {
		return "";
	}
	let output = `${day} ${monthname} ${year}`;
	return output;
};

Object.defineProperty(POPC2.prototype.GetDateFromInteger, "name", { value: "GetDateFromInteger" });



