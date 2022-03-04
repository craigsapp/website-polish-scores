{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 20:08:53 PDT 2021
// Last Modified: Tue Oct 12 20:08:56 PDT 2021
// Filename:      _includes/shared/hnpCallback.js
// Used by:       displayHumdrum
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Post-verovio actions after SVG of notation is rendered.
//
{% endcomment %}

POPC2.prototype.HnpCallback = function (humid) {
	this.DebugMessageFunction();

	this.ClearWaitingCursor();
	let that = this;
	setTimeout(function() {
		that.ClearWaitingCursor();
	}, 80);
	setTimeout(function() {
		that.ClearWaitingCursor();
	}, 85);
	setTimeout(function() {
		that.ClearWaitingCursor();
	}, 95);
	setTimeout(function() {
		that.ClearWaitingCursor();
	}, 120);

	var svg = document.querySelector(`#${humid}-svg`);
	if (svg) {
		if (popc2.VARS.MARKER) {
			   popc2.VARS.MARKER.loadSvg(`#${humid}-svg svg`);
		}
	}

	// Update search results on work page from embedded search
	// results in Humdrum output from verovio:
	vrvWorker.getHumdrum()
		.then(humdrum => popc2.displayWorkSearchResults(humdrum));

	// Prepare timemap in case it is needed (for keyscape performance time selection).
   popc2.LoadTimemap();

	// display any embedded scan links
	popc2.displayScanInfo();

};

Object.defineProperty(POPC2.prototype.HnpCallback, "name", { value: "HnpCallback" });



