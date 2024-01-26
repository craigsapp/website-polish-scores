{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Jan 25 22:53:10 PST 2024
// Last Modified: Thu Jan 25 23:14:48 PST 2024
// Filename:      _includes/keyscape/downloadKeyscape.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the keyscape image on the page.
//
{% endcomment %}

POPC2.prototype.downloadKeyscape = function () {
	this.DebugMessageFunction();
	let id = this.VARS.WORK_ID;
	if (!id) {
		return;
	}

	let kelement = document.querySelector("#keyscape img");
	if (!kelement) {
		return;
	}

	let src = kelement.src;
	if (!src) {
		return;
	}

	fetch(src)
	.then(response => {
		if (!response.ok) {
			throw new Error(`Problem downloading keyscape: ${response.status}`);
		}
		return response.blob();
	})
	.then(blob => {
		let url = window.URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.href = url;
		let filename = src;
		if (!src.match(/\.png$/)) {
			filename += ".png";
		}
		filename = filename.replace(/^https?:\/\/.*?\//, "");
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	})
	.catch(error => {
		console.error('Error downloading keyscape:', error);
	});

};

Object.defineProperty(POPC2.prototype.downloadKeyscape, "name", { value: "downloadKeyscape" });



