{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 11:47:56 PDT 2021
// Last Modified: Fri Oct 22 11:47:58 PDT 2021
// Filename:      _includes/work/getActiveSubpage.html
// Included in:   _includes/work/work.html
// Syntax:        HTML
// vim:           ts=3:nowrap
//
// Description:   Return which subpage (if any) is open.
//
{% endcomment %}

POPC2.prototype.getActiveSubpage = function () {
	this.DebugMessageFunction();
	let elements = document.querySelectorAll("[id^='subpage-']");
	for (let i=0; i<elements.length; i++) {
		if (elements[i].classList.contains("hidden")) {
			continue;
		}
		let id = elements[i].id;
		if (id) {
			let matches = id.match(/^subpage-\s*(.*)\s*/);
			if (matches) {
				return matches[1];
			}
		}
	}
	return "";
};

Object.defineProperty(POPC2.prototype.getActiveSubpage, "name", { value: "getActiveSubpage" });



