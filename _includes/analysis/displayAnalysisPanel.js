{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 18:51:07 PDT 2021
// Last Modified: Wed Nov  3 18:51:10 PDT 2021
// Filename:      _includes/browse/displayAnalysisPanel.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.displayAnalysisPanel = function (tool) {
	this.DebugMessageFunction(tool);

	let list = document.querySelectorAll("div.analysis-options");
	if (!tool) {
		for (let i=0; i<list.length; i++) {
			list[i].classList.add("invisible");
		}
		return;
	}

	for (let i=0; i<list.length; i++){
		if (!list[i].id) {
			list[i].classList.add("invisible");
			continue;
		}
		if (list[i].id === `analysis-${tool}`) {
			list[i].classList.remove("invisible");
		} else {
			list[i].classList.add("invisible");
		}
	}
};

Object.defineProperty(POPC2.prototype.displayAnalysisPanel, "name", { value: "displayAnalysisPanel" });


