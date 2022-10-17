{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun May 29 16:46:52 PDT 2022
// Last Modified: Sun May 29 16:46:54 PDT 2022
// Filename:      _includes/shared/ShowWebsiteTitle.js
// Used by:       
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the website title in the current langauge.
//
{% endcomment %}


POPC2.prototype.ShowWebsiteTitle = function () {
	this.DebugMessageFunction();

	let ptype = "";
	let n = document.querySelectorAll("[id^='navigator-']");
	for (let i=0; i<n.length; i++) {
		if (n[i].classList.contains("hidden")) {
			continue;
		}
		let id = n[i].id;
		let matches = id.match(/navigator-(.*)/);
		if (matches) {
			ptype = matches[1];
			break;
		}
	}

	let h1element = document.querySelector("h1#page-title");
	if (h1element) {
		if (ptype === "history") {
			h1element.innerHTML = this.getTranslation("history");
			h1element.dataset.trans = "history";
		} else if (ptype === "bookmarks") {
			h1element.innerHTML = this.getTranslation("bookmarks");
			h1element.dataset.trans = "bookmarks";
		//JI: added title translation for Declaration of Accessibility
		} else if (ptype === "accessibility") {
			h1element.innerHTML = this.getTranslation("accessibility");
			h1element.dataset.trans = "accessibility";
		} else {
			let title = this.getTranslation(`title_${this.VARS.REPERTORY}`) || "ERROR";
			h1element.innerHTML = title;
			h1element.dataset.trans = `title_${this.VARS.REPERTORY}`;
			h1element.classList.remove("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.ShowWebsiteTitle, "name", { value: "ShowWebsiteTitle" });


