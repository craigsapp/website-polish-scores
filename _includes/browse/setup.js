// vim: ts=3

// SEARCH stores the last search that was done.  This is used to
// redo the search fields when the langauge is changes, or when returning
// to the page at a later date.
let SEARCH = {};

if (localStorage.SEARCH) {
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



