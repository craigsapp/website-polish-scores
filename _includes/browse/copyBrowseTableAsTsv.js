{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 26 04:59:10 CET 2021
// Last Modified: Fri Nov 26 04:59:13 CET 2021
// Filename:      _includes/browse/copyBrowseTableAsTsv.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Copy the contents of the browse search results table
//                as TSV text, adding a column for the URL to each work
//                in the table.
//
{% endcomment %}

POPC2.prototype.copyBrowseTableAsTsv = function () {
	this.DebugMessageFunction();

	let tableElement = document.querySelector("table.search-results");
	if (!tableElement) {
		console.warn("ERROR: Cannot find search results table");
		return;
	}

	let headerElement = tableElement.querySelector("thead");
	let headers       = headerElement.querySelectorAll("th");
	let bodyElement   = tableElement.querySelector("tbody");
	let rows          = bodyElement.querySelectorAll("tr");

	// Print table header:
	let output = "";
	let tabcount = 0;
	for (let i=0; i<headers.length; i++) {
		let cell = headers[i];
		if (cell.classList.contains("hidden")) {
			continue;
		}
		text = cell.textContent.replace(/[\n\r]+/g, " ").trim();
		if (tabcount > 0) {
			output += "\t";
		}
		output += text;
		tabcount++;
	}
	if (tabcount > 0) {
		output += "\t";
	}
	output += "Link";
	output += "\n";

	// Print table body:
	for (let i=0; i<rows.length; i++) {
		let id = rows[i].dataset.id;
		if ((!id) || id.match(/^\s*$/)) {
			continue;
		}
		let cells = rows[i].querySelectorAll("td");
		let tabcount = 0;
		for (let j=0; j<cells.length; j++) {
			let cell = cells[j];
			if (cell.classList.contains("hidden")) {
				continue;
			}
			text = cell.textContent.replace(/[\n\r]+/g, " ").trim();
			if (tabcount > 0) {
				output += "\t";
			}
			output += text;
			tabcount++;
		}
		if (tabcount > 0) {
			output += "\t";
		}
		let url = `${window.location.origin}?id=${id}`;
		output += url;
		output += "\n";

	}

	this.CopyToClipboard(output);

};

Object.defineProperty(POPC2.prototype.copyBrowseTableAsTsv, "name", { value: "copyBrowseTableAsTsv" });



