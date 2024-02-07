{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Jun  4 08:39:41 PDT 2022
// Last Modified: Sat Jun  4 08:39:45 PDT 2022
// Filename:      _includes/tool/toggleToolOpacity.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle opacity of tool pane.
//
{% endcomment %}

POPC2.prototype.toggleToolOpacity = function () {
	this.DebugMessageFunction();
	let pane = document.querySelector("#tools");
	let rightInfo = document.querySelector("#right-info");
	if (pane) {
		let opacity = parseFloat(pane.style.opacity || {{ site.slight_opacity }});
		if (opacity == 1.0) {
			opacity = {{ site.slight_opacity }};
		} else {
			opacity = 1.0;
		}
		pane.style.opacity = opacity;
		if (rightInfo) {
			if (opacity == 1) {
				rightInfo.style.visibility = "hidden";
			} else {
				rightInfo.style.visibility = "visible";
			}
		}
	}
};

Object.defineProperty(POPC2.prototype.toggleToolOpacity, "name", { value: "toggleToolOpacity" });



