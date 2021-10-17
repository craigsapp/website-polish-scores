{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 13 00:38:18 PDT 2021
// Last Modified: Wed Oct 13 00:38:21 PDT 2021
// Filename:      _includes/work/toggleMusicIncipit.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between full-score and musical incipit views.
//
{% endcomment %}

POPC2.prototype.toggleMusicIncipit = function () {
	this.DebugMessageFunction();

	if (this.VARS.HNP_OPTIONS.incipit) {
		if (this.VARS.HNP_OPTIONS.incipit === "true") {
			this.VARS.HNP_OPTIONS.incipit = "false";
		} else {
			this.VARS.HNP_OPTIONS.incipit = "true";
		}
	} else {
		this.VARS.HNP_OPTIONS.incipit = "true";
	}

	let element = document.querySelector("#incipit-button");
	if (element) {
		if (this.VARS.HNP_OPTIONS.incipit === "true") {
			element.classList.remove("fa-compress-arrows-alt");
			element.classList.add("fa-expand-arrows-alt");
			element.dataset.transatt = "title:incipit_tool_expand";
		} else {
			element.classList.remove("fa-expand-arrows-alt");
			element.classList.add("fa-compress-arrows-alt");
			element.dataset.transatt = "title:incipit_tool_compress";
		}
	}

	let id = this.VARS.WORK_ID;
	this.ApplyElementTranslations();
	this.displayScore(id, true);
};

Object.defineProperty(POPC2.prototype.toggleMusicIncipit, "name", { value: "toggleMusicIncipit" });



