{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 10:32:14 PDT 2021
// Last Modified: Mon Oct 11 18:29:32 PDT 2021
// Filename:      _includes/initialize/getCgiParameters.js
// Used by:       _includes/initialize/main.html
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Returns an associative array containing the
//                page's URL's CGI parameters, expanded to full names.
//
//   Short    Long        Meaning
//  -------------------------------------------
//    y      century      option string for century select
//    c      composer     option string for composer select
//    s      siglum       option string for library select
//    g      genre        option string for genre select
//    n      nationality  option string for genre select
//    t      title        query string for title searches
//    l      lyrics       query string for lyrics searches
//    p      pitch        query string for melodic pitch searches
//    id                  work ID for displaying score
//
// For y, c, s, n, and g, the string must match exactly one of the select options.
//
{% endcomment %}

POPC2.prototype.getCgiParameters = function () {
	var url = window.location.search.substring(1);
	this.DebugMessageFunction(url);
	var output = {};
	var settings = url.split('&');
	if (!settings) {
		return output;
	}
	for (var i=0; i<settings.length; i++) {
		var pair = settings[i].split('=');
		pair[0] = decodeURIComponent(pair[0]);
		if (!pair[0]) {
			continue;
		}
		if (pair[0] === "y") { pair[0] = "century"; }
		if (pair[0] === "c") { pair[0] = "composer"; }
		if (pair[0] === "s") { pair[0] = "siglum"; }
		if (pair[0] === "g") { pair[0] = "genre"; }
		if (pair[0] === "n") { pair[0] = "nationality"; }
		if (pair[0] === "t") { pair[0] = "title"; }
		if (pair[0] === "l") { pair[0] = "lyrics"; }
		if (pair[0] === "p") { pair[0] = "pitch"; }
		pair[1] = decodeURIComponent(pair[1]);
		if (typeof output[pair[0]] === 'undefined') {
			output[pair[0]] = pair[1];
		} else if (typeof output[pair[0]] === 'string') {
			var arr = [ output[pair[0]], pair[1] ];
			output[pair[0]] = arr;
		} else {
			output[pair[0]].push(pair[1]);
		}
	}
	this.DebugMessage("CGI PARAMETERS: " + JSON.stringify(output), "steelblue");
	return output;
};

Object.defineProperty(POPC2.prototype.getCgiParameters, "name", { value: "getCgiParameters" });


