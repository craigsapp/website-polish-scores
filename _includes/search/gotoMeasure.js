{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov 24 00:04:47 CET 2021
// Last Modified: Wed Nov 24 00:04:50 CET 2021
// Filename:      _includes/browse/gotoMeasure.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   After runing the msearch filter, extracts its contents
//                to display on the work webpage.
//
// Example embedded results:
//     !!!Xfilter: msearch -p 'c'
//     !!!RDF**kern: @ = marked note
//     !!@@BEGIN: MUSIC_SEARCH_RESULT
//     !!@QUERY:	 -p c
//     !!@MATCHES:	4
//     !!@MARKER:	@
//     !!@@END: MUSIC_SEARCH_RESULT
//
// To do: deal with cases where there is no measure with a given number (due to 
//      hidden barlines most likely).  This can be minimized by implementation of
//      issue https://github.com/humdrum-tools/verovio-humdrum-viewer/issues/632
//
{% endcomment %}

POPC2.prototype.gotoMeasure = function (barnum) {
	this.DebugMessageFunction();
	let measure = popc2.VARS.MARKER.getMeasure(barnum);
	if (!measure) {
		console.warn(`Warning: no measure ${barnum} found in score.`);
		return;
	}

	function scrollToElementAdjusted(element, offset) {
    	var elementPosition = element.getBoundingClientRect().top;
    	var offsetPosition = elementPosition - offset;
    	window.scrollTo({
         	top: offsetPosition,
         	behavior: "smooth"
    	});
	}

	// Maybe refine to go to highest point in the system 
	// and then offset by the top navigator plus an extra margin.
	scrollToElementAdjusted(measure.element, 80);

};

Object.defineProperty(POPC2.prototype.gotoMeasure, "name", { value: "gotoMeasure" });



