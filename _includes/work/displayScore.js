{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Tue Oct 12 19:40:05 PDT 2021
// Filename:      _includes/work/displayScore.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Prepare a Humdrum score and then display on page.
//
{% endcomment %}

POPC2.prototype.displayScore = function (id) {
	this.DebugMessageFunction(id);
	this.displayWorkNavigator();
	this.ApplyElementTranslations();

	this.VARS.WORK_ID = id;
	this.displayWorkInfo(id);

	let options = JSON.parse(JSON.stringify(this.VARS.HNP_OPTIONS));
	// options.incipit = true;
	options.source = "humdrum";
	options.postFunction = target => popc2.HnpCallback(target);
	if (this.VARS.HUMDRUM[id]) {
		this.storeHumdrumOnPage(this.VARS.HUMDRUM[id]);
		console.log("HNP OPTIONS", options);
		setTimeout(function() {
			 document.body.classList.add("waiting");
		}, 80);
		displayHumdrum(options);
		scroll(0, 0);
	} else {
		let url = `${this.SETTINGS.data_addr}/${id}.krn`;
		this.DebugMessage("Downloading Humdrum score " + url, "yellow");
		let that = this;
		fetch(url)
			.then(res => res.text())
			.then(text => {
				if (!text.match(/^\s*[!*]/)) {
					console.error(`ERROR: Problem downloading ${url}.  Content was:`);
					console.log(text);
					return;
				}
				that.VARS.HUMDRUM[id] = text;
				that.storeHumdrumOnPage(text);
				console.log("HNP OPTIONS", options);
				setTimeout(function() {
					document.body.classList.add("waiting");
				}, 80);
				displayHumdrum(options);
				scroll(0, 0);
				this.prefetchAdjacentHumdrumScores(id);
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}
};

Object.defineProperty(POPC2.prototype.displayScore, "name", { value: "displayScore" });



