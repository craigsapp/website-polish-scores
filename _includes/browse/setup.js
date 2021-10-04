// vim: ts=3

let CGI = getCgiParameters();

let cgiSearch = false;
if (typeof CGI.century  !== "undefined") { cgiSearch = true; }
if (typeof CGI.composer !== "undefined") { cgiSearch = true; }
if (typeof CGI.siglum   !== "undefined") { cgiSearch = true; }
if (typeof CGI.genre    !== "undefined") { cgiSearch = true; }
if (typeof CGI.text     !== "undefined") { cgiSearch = true; }

// SEARCH stores the last search that was done.  This is used to
// redo the search fields when the langauge is changes, or when returning
// to the page at a later date.
let SEARCH = {};

if (cgiSearch) {
	if (typeof CGI.century  !== "undefined") { SEARCH.century  = CGI.century;  }
	if (typeof CGI.composer !== "undefined") { SEARCH.composer = CGI.composer; }
	if (typeof CGI.siglum   !== "undefined") { SEARCH.siglum   = CGI.siglum;   }
	if (typeof CGI.genre    !== "undefined") { SEARCH.genre    = CGI.genre;    }
	if (typeof CGI.text     !== "undefined") { SEARCH.text     = CGI.text;     }
} else if (localStorage.SEARCH) {
	SEARCH = JSON.parse(localStorage.SEARCH);
}


// Keep track of all searches done in the current session.
let SEARCH_HISTORY = [];


// SEARCH_FREEZE: Prevent recursion problems with dynamic search filters.
let SEARCH_FREEZE = false;


//////////////////////////////
//
// storeSearchInfo --
//

function storeSearchInfo(search) {
	if (!search) {
		search = SEARCH;
	}
	if (!search) {
		search = {};
	}
	localStorage.SEARCH = JSON.stringify(search);
	SEARCH_HISTORY.push(search);
}



