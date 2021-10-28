{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 28 10:58:16 PDT 2021
// Last Modified: Thu Oct 28 10:58:19 PDT 2021
// Filename:      _includes/shared/LoadTimemap.js
// Used by:       _includes/keyscape/showKeyscape.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store a timemap created from the current score.
//
{% endcomment %}

POPC2.prototype.LoadTimemap = function () {
	let id = this.VARS.WORK_ID;
	if (this.VARS.HUMDRUM[id] && !this.VARS.TIMEMAP[id]) {
		vrvWorker.renderToTimemap()
			.then(result => { this.VARS.TIMEMAP[id] = result })
			.catch(err => { console.error(err) });
	}
}

Object.defineProperty(POPC2.prototype.LoadTimemap, "name", { value: "LoadTimemap" });



