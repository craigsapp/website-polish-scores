{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Fri Oct 22 23:05:17 PDT 2021
// Filename:      _includes/keyscape/showKeyscape.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load a keyscape image into the page.
//
{% endcomment %}

POPC2.prototype.showKeyscape = function (id) {
	this.DebugMessageFunction(id);
	if (!id) {
		id = this.VARS.WORK_ID;
	}
	if (!id) {
		return;
	}

	if (!this.VARS.KEYSCAPE.INFO[id]) {
		let infourl = `${this.SETTINGS.data_addr}/${id}.keyscape-info`;
		fetch(infourl)
			.then(res => res.json())
			.then(json => {
				// console.warn("JSON INFO KEYSCAPE", json);
				this.VARS.KEYSCAPE.INFO[id] = json;
			})
			.catch(err => { console.error(err); });
	}

	// Store timemap, which can be used to start MIDI music playback
	// when clicking on the keyscape.
	this.LoadTimemap();

	let option1 = "abs";
	let option2 = "pre";

	let element1 = document.querySelector("#checkbox-relative");
	let element2 = document.querySelector("#checkbox-cleaned");
	if (element1 && element1.checked) {
		option1 = "rel";
	}
	if (element2 && element2.checked) {
		option2 = "post";
	}

	let url = `${this.SETTINGS.data_addr}/${id}.keyscape-${option1}${option2}`;
	let ielement = document.querySelector("#keyscape img");
	ielement.src = url;

	// Update the URL if one of the checkboxes has changed:
	this.updateWorkUrlDisplay();
};

Object.defineProperty(POPC2.prototype.showKeyscape, "name", { value: "showKeyscape" });



