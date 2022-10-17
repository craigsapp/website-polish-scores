{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Jun  3 21:32:16 PDT 2022
// Last Modified: Fri Jun  3 21:32:19 PDT 2022
// Filename:      _includes/browse/showAccessibility.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Displays Declaration of Accessibility page. Copied from bookmarks and adjusted by JI.
//
{% endcomment %}


POPC2.prototype.showAccessibility = function () {
	this.DebugMessageFunction();

	let navigators = document.querySelectorAll("[id^='navigator-']");
	let pageName = "";
	let currentNavigator = null;

	for (let i=0; i<navigators.length; i++) {
		let n = navigators[i];
		let hidden = n.classList.contains("hidden");
		if (hidden) {
			continue;
		}
		let id = n.id || "";
		let matches = id.match(/navigator-([^\s]+)/);
		if (matches) {
			pageName = matches[1];
			currentNavigator = n;
			break;
		}
	}
	
	accessibilityUrl = document.querySelector("#declaration-url");
	if	(pageName === "browse") {
		if (accessibilityUrl.classList.contains("hidden")) {
			accessibilityUrl.classList.remove("hidden");
		}
	} else {
		if	accessiblityUrl.classList.contains("hidden") {
			console.log("JI: accessibilityUrl allready hidden");
		} else {
			accessibilityUrl.classList.add("hidden");
		}
	}

		

};

Object.defineProperty(POPC2.prototype.showAccessibility, "name", { value: "showAccessibility" });



