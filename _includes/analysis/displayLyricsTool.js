{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 26 09:55:08 CET 2021
// Last Modified: Fri Nov 26 09:55:12 CET 2021
// Filename:      _includes/browse/displayLyricsTool.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.displayLyricsTool = function (tool) {
	this.DebugMessageFunction(tool);

	this.displayAnalysisPanel("lyrics");

	let toolElement = document.querySelector("#analysis-lyrics");
	if (toolElement) {
		toolElement.innerHTML = "";
	} else {
		return;
	}

	let id = this.VARS.WORK_ID;
	if ((!id) || (id.match(/^\s*$/))) {
		return;
	}

	let url = `${this.SETTINGS.data_addr}/${id}.lyrics`;
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

			if (!script.match(/^\s*$/)) {
				script += "\nconsole.warn('PARSING LYRIC SCRIPT');\n";

				let selement = document.querySelector("#lyric-script");
				if (!selement) {
					// add lyric tool script for highlighting same words
					// as hovered text.
					selement = document.createElement("script");
					selement.setAttribute("id", "lyric-script");
					selement.textContent = script;
					document.head.appendChild(selement);
				}
			}

			// style adjustments: hide the title
			let h2 = toolElement.querySelector("h2");
			if (h2) {
				h2.style.display = "none";
			}

			let verseElements = toolElement.querySelectorAll("td.verse");
			for (let i=0; i<verseElements.length; i++) {
				verseElements[i].style.visibility = "hidden";
			}

		})
		.catch(err => { console.error('Error downloading Lyrics tool:', err)});

};

Object.defineProperty(POPC2.prototype.displayLyricsTool, "name", { value: "displayLyricsTool" });



