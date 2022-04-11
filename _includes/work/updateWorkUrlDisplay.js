{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Feb 14 02:44:32 PST 2022
// Last Modified: Mon Feb 14 02:44:36 PST 2022
// Filename:      _includes/work/updateWorkUrlDisplay.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Update the url on the webpage to give a link
//                to the current score and active display settings.
//
{% endcomment %}

POPC2.prototype.updateWorkUrlDisplay = function (id) {
	if (!id) {
		id = this.VARS.WORK_ID;
	}
	if (!id) {
		return;
	}

	let url = `${window.location.origin}/?id=${id}`;

	// check for keyscape states.
	let subpage = this.getActiveSubpage();
	if (subpage === "keyscape") {
		url += "&k";
		let celement = document.querySelector("#checkbox-cleaned");
		let relement = document.querySelector("#checkbox-relative");
		let ccheck = celement.checked;
		let rcheck = relement.checked;
		if (ccheck || rcheck) {
			url += "=";
		}
		if (ccheck) {
			url += "c"
		}
		if (rcheck) {
			url += "r"
		}
		let startmeasure = this.VARS.KEYSCAPE.SELECT_START_MEASURE;
		let endmeasure   = this.VARS.KEYSCAPE.SELECT_END_MEASURE;
		if (startmeasure >= 0 && endmeasure >= 0) {
			if (startmeasure == endmeasure) {
				url += `m${startmeasure}`;
			} else {
				url += `m${startmeasure}-${endmeasure}`;
			}
		}
	}

	if (url !== window.location.href) {
		console.error("Setting URL", url);
		window.history.pushState(null, null, url);
	}

};

Object.defineProperty(POPC2.prototype.updateWorkUrlDisplay, "name", { value: "updateWorkUrlDisplay" });



