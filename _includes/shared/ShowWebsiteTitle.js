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
	let h1element = document.querySelector("h1");
	if (h1element) {
		h1element.innerHTML = this.getTranslation(`title_${this.VARS.REPERTORY}`);
	}
	h1element.classList.remove("hidden");
};

Object.defineProperty(POPC2.prototype.ShowWebsiteTitle, "name", { value: "ShowWebsiteTitle" });


