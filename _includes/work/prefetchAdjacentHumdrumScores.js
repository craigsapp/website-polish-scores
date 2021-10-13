{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:30:44 PDT 2021
// Last Modified: Tue Oct 12 19:31:10 PDT 2021
// Filename:      _includes/work/prefetchAdjacentHumdrumScores.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the next/previous Humdrum file before it
//                is needed in order to speed up display of the
//                music notation.
//
{% endcomment %}

POPC2.prototype.prefetchAdjacentHumdrumScores = function(id) {
	this.DebugMessageFunction();

	let index = this.VARS.SEARCH_RESULTS;
	let obj = this.GetIndexAndTypeInSearchResults(id, index);
	let foundi = obj.index;
	let idtype = obj.type;
	if (foundi < 0) {
		return;
	}
	if (idtype === "unkown") {
		idtype = "fileid";
	}
	if (!idtype) {
		idtype = "fileid";
	}

	let nexti = foundi + 1;
	let previ = foundi - 1;
	if (previ < 0) {
		previ = index.length - 1;
	}
	if (nexti >= index.length - 1) {
		nexti = 0;
	}

	let nextEntry = index[nexti];
	let prevEntry = index[previ];

	let nextFileId = nextEntry[idtype];
	let prevFileId = prevEntry[idtype];

	if (nextFileId && (!this.VARS.HUMDRUM[nextFileId])) {
		let url = `${this.SETTINGS.data_addr}/${nextFileId}.krn`;
		this.DebugMessage("PREFECTHING " + url, "darkgoldenrod");
		let that = this;
		fetch(url)
			.then(res => res.text())
			.then(text => {
				if (!text.match(/^\s*[!*]/)) {
					console.error(`ERROR: Problem downloading ${url}.  Content was:`);
					console.log(text);
					return;
				}
				that.VARS.HUMDRUM[nextFileId] = text;
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}

	if (prevFileId && (!this.VARS.HUMDRUM[prevFileId])) {
		let url = `${this.SETTINGS.data_addr}/${prevFileId}.krn`;
		this.DebugMessage("PREFECTHING " + url, "darkgoldenrod");
		let that = this;
		fetch(url)
			.then(res => res.text())
			.then(text => {
				if (!text.match(/^\s*[!*]/)) {
					console.error(`ERROR: Problem downloading ${url}.  Content was:`);
					console.log(text);
					return;
				}
				that.VARS.HUMDRUM[prevFileId] = text;
			})
			.catch(err => { console.error('Error downloading Humdrum:', err)});
	}
};

Object.defineProperty(POPC2.prototype.prefetchAdjacentHumdrumScores, "name", { value: "prefetchAdjacentHumdrumScores" });



