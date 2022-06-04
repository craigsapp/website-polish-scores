{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 01:27:14 PDT 2021
// Last Modified: Fri Oct  8 01:27:16 PDT 2021
// Filename:      _includes/shared/GetPageType.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Return the type of page that is currently visible.  This is done
//                by looking at all of the div.page elements.  The first element
//                (and assumed only element) which does not have a .hidden class
//                will be identify as the page.   The page type is encoded
//                after "page-" in the ID, such as "browse" for id="page-browse".
//
{% endcomment %}

POPC2.prototype.GetPageType = function () {
	this.DebugMessageFunction();
	let pages = document.querySelectorAll(".page");
	for (let i=0; i<pages.length; i++) {
		if (pages[i].classList.contains("hidden")) {
			continue;
		}
		let id = pages[i].id;
		if (!id) {
			continue;
		}
		let matches = id.match(/^page-(.*)/);
		if (matches) {
			pageType =  matches[1];
			if (pageType !== "browse") {
				return pageType;
			}
			let n = document.querySelectorAll("[id^='navigator-']");
			for (let i=0; i<n.length; i++) {
				if (n[i].classList.contains("hidden")) {
					continue;
				}
				let id = n[i].id;
				let matches = id.match(/navigator-(.*)/);
				if (matches) {
					let pageType = matches[1];
					return pageType;
				}
			}
		}
	}
	return "none";
};

Object.defineProperty(POPC2.prototype.GetPageType, "name", { value: "GetPageType" });



