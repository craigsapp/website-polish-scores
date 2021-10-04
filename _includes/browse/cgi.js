

//////////////////////////////
//
// getCgiParameters -- Returns an associative array containing the
//     page's URL's CGI parameters, expanded to full names.
//
//   Short    Long        Meaning
//  -------------------------------------------
//    y      century      option string for century select
//    c      composer     option string for composer select
//    s      siglum       option string for library select
//    g      genre        option string for genre select
//    n      nationality  option string for genre select
//    t      title        query string for title searches
//    id                  work ID for displaying score
//
// For y, c, s, n, and g, the string must match exactly one of the select options.
//

function getCgiParameters() {
	var url = window.location.search.substring(1);
	var output = {};
	var settings = url.split('&');
	for (var i=0; i<settings.length; i++) {
		var pair = settings[i].split('=');
		pair[0] = decodeURIComponent(pair[0]);
		if (pair[0] === "y") { pair[0] = "century"; }
		if (pair[0] === "c") { pair[0] = "composer"; }
		if (pair[0] === "s") { pair[0] = "siglum"; }
		if (pair[0] === "g") { pair[0] = "genre"; }
		if (pair[0] === "n") { pair[0] = "nationality"; }
		if (pair[0] === "t") { pair[0] = "title"; }
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
	return output;
}


