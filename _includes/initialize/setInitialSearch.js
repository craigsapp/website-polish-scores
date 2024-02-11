{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 10 20:18:39 PDT 2021
// Last Modified: Sun Feb  6 20:30:15 PST 2022
// Filename:      _includes/initialize/setInitialSearch.js
// Used by:       _includes/initialize/main.html
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Set an initial search, giving priority to any CGI
//                parameters.  If no CGI parameters, then check
//                localStorage.SEARCH.
//
{% endcomment %}

POPC2.prototype.setInitialSearch = function (path) {
	this.DebugMessageFunction();

	let cgi = this.VARS.CGI;
	let tempSearch = {};
	if (cgi.composer)    { tempSearch.composer    = cgi.composer;    }
	if (cgi.century)     { tempSearch.century     = cgi.century;     }
	if (cgi.genre)       { tempSearch.genre       = cgi.genre;       }
	if (cgi.siglum)      { tempSearch.siglum      = cgi.siglum;      }
	if (cgi.nationality) { tempSearch.nationality = cgi.nationality; }
	if (cgi.text)        { tempSearch.text        = cgi.text;        }
	if (cgi.lyrics)      { tempSearch.lyrics      = cgi.lyrics;      }
	if (cgi.pitch)       { tempSearch.pitch       = cgi.pitch;       }
	if (cgi.instrument)  { tempSearch.instrument  = cgi.instrument;  }
	if (cgi.tonic)       { tempSearch.tonic       = cgi.tonic;       }
	if (cgi.mode)        { tempSearch.mode        = cgi.mode;        }
	let keys = Object.keys(tempSearch);
	if (keys.length > 0) {
		this.VARS.SEARCH = tempSearch;
		this.DebugMessage("INITIAL CGI SEARCH SET TO: " + JSON.stringify(this.VARS.SEARCH), "steelblue");
		return;
	}

	if (localStorage.SEARCH) {
		tempSearch = JSON.parse(localStorage.SEARCH);
		if (tempSearch) {
		   this.DebugMessage("INITIAL LOCALSTORAGE SEARCH SET TO: " + JSON.stringify(this.VARS.SEARCH), "steelblue");
			this.VARS.SEARCH = tempSearch
		}
	}

};

Object.defineProperty(POPC2.prototype.setInitialSearch, "name", { value: "setInitialSearch" });



