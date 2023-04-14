{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Sat Apr  2 19:20:31 PDT 2022
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
	this.HideIiifLogo();
	stop(); // turn of any active MIDI from a previous score

	if (id === "random") {
		id = this.getRandomWorkId(this.VARS.SEARCH_RESULTS);
	}
	if (!id) {
		id = this.VARS.WORK_ID;
	}
	this.VARS.WORK_ID = id;

	this.DisplayComposerPortrait();
	this.DisplayLibraryPortrait();
	this.doAnalysis(true);

	if (this.VARS.KEYSCAPE.ID && (id !== this.VARS.KEYSCAPE.ID)) {
		this.VARS.KEYSCAPE.ID = "";
		this.VARS.KEYSCAPE.FREEZE = 0;
		this.VARS.KEYSCAPE.SELECT_MOUSE_X = -1;
		this.VARS.KEYSCAPE.SELECT_MOUSE_Y = -1;
	}

	this.updateWorkUrlDisplay(id);

	let subpage = this.getActiveTool();
	if (subpage === "keyscape") {
		if (id !== this.VARS.KEYSCAPE_ID) {
			this.showKeyscape(id);
		}
	}
	this.storeWorkId(id);
	this.displayWorkInfo(id);

	let that = this;
	let options = JSON.parse(JSON.stringify(this.VARS.HNP_OPTIONS));
	options.source = "humdrum";
	options.postFunction = target => popc2.HnpCallback(target);
	options = this.addNotationConfigureOptions(options);
	options = this.addTempoScalingOption(options);
	options = this.addAnalysisOptions(options);
	options = this.addWorkPageSearchOptions(options);
	if (this.VARS.HUMDRUM[id]) {
		this.storeHumdrumOnPage(this.VARS.HUMDRUM[id]);
		if (this.SETTINGS.debug_verbose === "true") {
			console.log("HNP OPTIONS", options);
		}
		setTimeout(function() {
			that.ShowWaitingCursor();
		}, 100);
		displayHumdrum(options);
		if (!noscrollQ) {
			scroll(0, 0);
		}
	} else {
		let url = `${this.SETTINGS.data_addr}/${id}.krn`;
		this.DebugMessage("Downloading Humdrum score " + url, "yellow");
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
					that.ShowWaitingCursor();
				}, 100);
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



