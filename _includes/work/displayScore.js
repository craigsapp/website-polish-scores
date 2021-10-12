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
	this.displayWorkNavigator();
	this.applyElementTranslations();

	this.VARS.WORK_ID = id;
	this.displayWorkInfo();

	let options = JSON.parse(JSON.stringify(this.VARS.HNP_OPTIONS));
	// options.incipit = true;
	options.source = "humdrum";
	if (this.VARS.HUMDRUM[id]) {
		this.storeHumdrumOnPage(this.VARS.HUMDRUM[id]);
		console.log("VHV OPTIONS", options);
		displayHumdrum(options);
		scroll(0, 0);
	} else {
		let url = `${this.SETTINGS.data_addr}/${id}.krn`;
		this.DebugMessage("Downloading Humdrum score " + url, "yellow");
		let that = this;
		fetch(url)
			.then(res => res.text())
			.then(text => {
				that.VARS.HUMDRUM[id] = text;
				that.storeHumdrumOnPage(text);
				console.log("VHV OPTIONS", options);
				displayHumdrum(options);
				scroll(0, 0);
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}
};

Object.defineProperty(POPC2.prototype.displayScore, "name", { value: "displayScore" });



