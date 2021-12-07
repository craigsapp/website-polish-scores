{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Wed Oct 13 00:39:54 PDT 2021
// Filename:      _includes/work/displayScore.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Prepare a Humdrum score and then display on page.
//
{% endcomment %}

POPC2.prototype.displayScore = function (id, noscrollQ) {
	this.DebugMessageFunction(id);
	this.displayWorkNavigator();
	this.ApplyElementTranslations();
	this.VARS.INITIALIZED_WORK_PAGE = true;

	if (id === "random") {
		id = this.getRandomWorkId(this.VARS.SEARCH_RESULTS);
	}
	if (!id) {
		id = this.VARS.WORK_ID;
	}

	let url = `${window.location.origin}/?id=${id}`;
	if (url !== window.location.href) {
		console.error("Setting URL", url);
		window.history.pushState(null, null, url);
	}

	let subpage = this.getActiveSubpage();
	if (subpage === "keyscape") {
		this.showKeyscape(id);
	}
	this.storeWorkId(id);
	this.displayWorkInfo(id);

	let options = JSON.parse(JSON.stringify(this.VARS.HNP_OPTIONS));
	options.source = "humdrum";
	options.postFunction = target => popc2.HnpCallback(target);
	options = this.addNotationConfigureOptions(options);
	options = this.addAnalysisOptions(options);
	options = this.addWorkPageSearchOptions(options);
	if (this.VARS.HUMDRUM[id]) {
		this.storeHumdrumOnPage(this.VARS.HUMDRUM[id]);
		if (this.SETTINGS.debug_verbose === "true") {
			console.log("HNP OPTIONS", options);
		}
		setTimeout(function() {
			 document.body.classList.add("waiting");
		}, 80);
		displayHumdrum(options);
		if (!noscrollQ) {
			scroll(0, 0);
		}
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
				if (this.SETTINGS.debug_verbose === "true") {
					console.log("HNP OPTIONS", options);
				}
				setTimeout(function() {
					document.body.classList.add("waiting");
				}, 80);
				displayHumdrum(options);
				if (!noscrollQ) {
					scroll(0, 0);
				}
				this.prefetchAdjacentHumdrumScores(id);
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}
};

Object.defineProperty(POPC2.prototype.displayScore, "name", { value: "displayScore" });



