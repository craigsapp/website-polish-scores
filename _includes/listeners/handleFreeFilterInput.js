{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Nov  2 12:45:15 PDT 2021
// Last Modified: Tue Nov  2 12:45:18 PDT 2021
// Filename:      _includes/listeners/handleFreeFilterInput.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.handleFreeFilterInput = function (event) {
	this.DebugMessageFunction(event.key);
	let target = event.target;
	if (!target) {
		return;
	}
	if (target.id !== "filter-input") {
		return;
	}
	let checkbox = document.querySelector("#checkbox-filter");
	if (!checkbox) {
		return;
	}
	let checkState = checkbox.checked;

	let key = event.key;
	if (key === "Enter") {
		// Activate filter and suppress propagation of event.
		if (!checkState) {
			checkbox.checked = true;
			event.stopPropagation();
			event.preventDefault();
			popc2.displayScore();
		}
	} else {
		// Deactivate filter and do not suppress propagation of event.
		if (checkState) {
			checkbox.checked = false;
			popc2.displayScore();
		}
	}


};

Object.defineProperty(POPC2.prototype.handleFreeFilterInput, "name", { value: "handleFreeFilterInput" });



