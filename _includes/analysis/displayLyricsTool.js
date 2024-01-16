{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 26 09:55:08 CET 2021
// Last Modified: Fri Nov 26 09:55:12 CET 2021
// Filename:      _includes/analysis/displayLyricsTool.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.displayLyricsTool = function (tool) {
	this.DebugMessageFunction(tool);

	this.displayAnalysisPanel("lyrics");

	let toolElement = document.querySelector("#lyrics-content");
	if (toolElement) {
		toolElement.innerHTML = "";
	} else {
		return;
	}

	let id = this.VARS.WORK_ID;
	if ((!id) || (id.match(/^\s*$/))) {
		return;
	}

	let melement = document.querySelector("#lyrics-modern");
	let modernQ = false;
	if (melement) {
		modernQ = melement.checked;
	}
	let url = `${this.SETTINGS.data_addr}/${id}.lyrics`;
	if (modernQ) {
		url += "-modern";
	}
	this.DebugMessage("Downloading lyrics tool " + url, "hotpink");
	let that = this;
	fetch(url)
		.then(res => res.text())
		.then(text => {
			if (text.match(/^\s*$/)) {
				console.error(`ERROR: Problem downloading ${url}.  Content was:`);
				console.log(text);
				return;
			}
			text = text.replace(/^.*<body>/s, "").replace(/<\/body>.*$/s, "");
			let script = "";
			let matches = text.match(/<script>(.*)<\/script>/s);
			if (matches) {
				script = matches[1];
				text = text.replace(/<script>.*<\/script>/s, "");
			}
			text += "<div style='height:30px'></div>";
			toolElement.innerHTML = text;

			// style adjustments: hide the title
			let h2 = toolElement.querySelector("h2");
			if (h2) {
				h2.style.display = "none";
			}

			let verseElements = toolElement.querySelectorAll("td.verse");
			for (let i=0; i<verseElements.length; i++) {
				verseElements[i].style.visibility = "hidden";
			}

			this.VARS.LASTWORD = "";
			this.prepareWordlist();

			let lyricsTable = toolElement.querySelector("table.lyrics");
			if (lyricsTable) {
				lyricsTable.addEventListener("mouseover", function(event) {
					if (!event.target.nodeName.match(/^SPAN$/i)) {
						return;
					}
					event.preventDefault();
					var text = event.target.innerHTML.toLowerCase();
					if (text === that.VARS.LASTWORD) {
						return;
					}
					that.unhighlightLyricsWord(that.VARS.LASTWORD);
					that.highlightLyricsWord(text);
					that.VARS.LASTWORD = text;
				});
			} else {
				console.error("Cannot find lyrics table");
			}

		})
		.catch(err => { console.error('Error downloading Lyrics tool:', err)});

};

Object.defineProperty(POPC2.prototype.displayLyricsTool, "name", { value: "displayLyricsTool" });



