//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/setup.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Initializations for the browse page.
//


GLOBAL.CGI = getCgiParameters();

let cgiSearch = false;
if (typeof GLOBAL.CGI.century     !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.composer    !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.siglum      !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.genre       !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.nationality !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.title       !== "undefined") { cgiSearch = true; }
if (typeof GLOBAL.CGI.lyrics      !== "undefined") { cgiSearch = true; }

if (cgiSearch) {
	if (typeof GLOBAL.CGI.century     !== "undefined") { GLOBAL.SEARCH.century     = GLOBAL.CGI.century;     }
	if (typeof GLOBAL.CGI.composer    !== "undefined") { GLOBAL.SEARCH.composer    = GLOBAL.CGI.composer;    }
	if (typeof GLOBAL.CGI.siglum      !== "undefined") { GLOBAL.SEARCH.siglum      = GLOBAL.CGI.siglum;      }
	if (typeof GLOBAL.CGI.genre       !== "undefined") { GLOBAL.SEARCH.genre       = GLOBAL.CGI.genre;       }
	if (typeof GLOBAL.CGI.nationality !== "undefined") { GLOBAL.SEARCH.nationality = GLOBAL.CGI.nationality; }
	if (typeof GLOBAL.CGI.title       !== "undefined") { GLOBAL.SEARCH.title       = GLOBAL.CGI.title;       }
	if (typeof GLOBAL.CGI.lyrics      !== "undefined") { GLOBAL.SEARCH.lyrics      = GLOBAL.CGI.lyrics;      }
} else if (localStorage.SEARCH) {
	GLOBAL.SEARCH = JSON.parse(localStorage.SEARCH);
}



//////////////////////////////
//
// storeSearchInfo --
//

function storeSearchInfo(search) {
	if (!search) {
		search = GLOBAL.SEARCH;
	}
	if (!search) {
		search = {};
	}
	localStorage.SEARCH = JSON.stringify(search);
}



