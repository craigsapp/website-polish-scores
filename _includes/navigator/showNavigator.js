{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 20:50:31 PDT 2021
// Last Modified: Tue Oct 12 20:50:34 PDT 2021
// Filename:      _includes/browse/showNavigator.js
// Used by:
// Included in:   _includes/navigator/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Choose a navigation toolbar to show.
//
{% endcomment %}

POPC2.prototype.showNavigator = function (target) {
	this.DebugMessageFunction(target);
	let navigators = document.querySelectorAll("[id^='navigator-']");
	for (let i=0; i<navigators.length; i++) {
		let id = navigators[i].id;
		if (!id) {
			continue;
		}
		let matches = id.match(/^\s*navigator-\s*(.*)\s*/);
		if (!matches) {
			continue;
		}
		if (matches[1] === target) {
			navigators[i].classList.remove("hidden");
		} else {
			navigators[i].classList.add("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.showNavigator, "name", { value: "showNavigator" });



