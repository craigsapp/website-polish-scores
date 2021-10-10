{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Thu Oct  7 19:08:05 PDT 2021
// Filename:      _includes/work/displayScore.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Prepare a Humdrum score and then display on page.
//
{% endcomment %}

POPC2.prototype.displayScore = function (id) {
	this.DebugMessageFunction(id);
	let options = JSON.parse(JSON.stringify(this.GLOBAL.HNP_OPTIONS));
	options.incipit = true;
	options.source = "humdrum";
	if (this.GLOBAL.HUMDRUM[id]) {
		this.storeHumdrumOnPage(this.GLOBAL.HUMDRUM[id]);
		console.log("VHV OPTIONS", options);
		displayHumdrum(options);
	} else {
		let url = `${this.SETTINGS.data_addr}/${id}.krn`;
		this.DebugMessage("Downloading Humdrum score " + url, "yellow");
		let that = this;
		fetch(url)
			.then(res => res.text())
			.then(text => {
				that.GLOBAL.HUMDRUM[id] = text;
				that.storeHumdrumOnPage(text);
				console.log("VHV OPTIONS", options);
				displayHumdrum(options);
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}
};

Object.defineProperty(POPC2.prototype.displayScore, "name", { value: "displayScore" });



