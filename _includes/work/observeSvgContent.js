{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 20:50:43 PDT 2021
// Last Modified: Thu Oct 14 20:50:45 PDT 2021
// Filename:      _includes/listeners/observeSvgContent.js
// Used by:
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Watch the contenst of #notation for changes in the SVG
//                image inside of it.  If it changes, change problem
//                and sic markers to fontawesome characters.
//
{% endcomment %}

POPC2.prototype.observeSvgContent = function () {
	this.DebugMessageFunction();

 	let content = document.querySelector("#notation");
	if (!content) {
		console.error("Error: Cannot find #notation element");
	}
	let i;
	let s;
	let that = this;

	let callback = function(mList, observer) {
		let svg = content.querySelector("svg");
		if (!svg) {
			return;
		}

		// Mark encoding problem messages with red caution symbol.
		spans = svg.querySelectorAll("g.dir.problem tspan.rend tspan.text tspan.text");
		for (i=0; i<spans.length; i++) {
			s = spans[i];
			if (s.innerHTML === "P") {
					s.innerHTML = "&#xf071";
					s.classList.add("p");
			}
			if (!that.VARS.PROBLEM_TEXT) {
				s.style.opacity = 0;
			} else {
				s.style.opacity = 1;
			}
		}

		// Mark encoding problem messages with green caution symbol.
		spans = svg.querySelectorAll("g.dir.sic tspan.rend tspan.text tspan.text");
		for (i=0; i<spans.length; i++) {
			s = spans[i];
			if (s.innerHTML === "S") {
				s.innerHTML = "&#xf071;";
				s.classList.add("s");
			}
		}

		for (var mu in mList) {
			if (svg && svg.isSameNode(mList[mu].target)) {
				// Remove busy class if svg changed
				// document.body.classList.remove("busy");
			}
		}
	};

	if (this.VARS.SVG_OBSERVER) {
		this.VARS.SVG_OBSERVER.disconnect();
		this.VARS.SVG_OBSERVER = null;
	}
	this.VARS.SVG_OBSERVER = new MutationObserver(callback);
	this.VARS.SVG_OBSERVER.observe(content,
		{
			childList: true,
			subtree: true,
			attributes: true
		});
};

Object.defineProperty(POPC2.prototype.observeSvgContent, "name", { value: "observeSvgContent" });


