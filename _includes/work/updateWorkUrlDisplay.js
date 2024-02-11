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

	console.error("ID_STYLE", this.VARS.ID_STYLE);
	if (this.VARS.ID_STYLE) {
		let si = this.VARS.SEARCH_INDEX;
		if (this.VARS.ID_STYLE === "cenid") {
			if (!id.match(/[12][0-9]xx/)) {
				for (let i=0; i<si.length; i++) {
					if (si[i].fileid === id) {
						id = si[i].cenid;
						break;
					}
				}
			}
		} else if (this.VARS.ID_STYLE === "fileid") {
			if (id.match(/[12][0-9]xx/)) {
				for (let i=0; i<si.length; i++) {
					if (si[i].cenid === id) {
						id = si[i].fileid;
						break;
					}
				}
			}
		}
	}

	let url = `${window.location.origin}/?id=${id}`;

	// check for keyscape states.
	let subpage = this.getActiveTool();
	if (subpage === "keyscape") {
		url += "&ks";
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
		if (id && (id === this.VARS.KEYSCAPE.ID)) {
			let startmeasure = this.VARS.KEYSCAPE.SELECT_START_MEASURE;
			let endmeasure   = this.VARS.KEYSCAPE.SELECT_END_MEASURE;
			if (startmeasure >= 0 && endmeasure >= 0) {
				if (!(rcheck || ccheck)) {
					url += "=";
				}
				if (startmeasure == endmeasure) {
					url += `m${startmeasure}`;
				} else {
					url += `m${startmeasure}-${endmeasure}`;
				}
			}
		}
	}

	if (url !== window.location.href) {
		// Equals sign for empty ks parameter cannot be removed.
		window.history.pushState(null, null, url);
	}
	this.updateConfigurationOptionsInUrl();

};

Object.defineProperty(POPC2.prototype.updateWorkUrlDisplay, "name", { value: "updateWorkUrlDisplay" });



