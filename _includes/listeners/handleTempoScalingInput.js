{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Apr  2 20:10:15 PDT 2022
// Last Modified: Sat Apr  2 20:10:20 PDT 2022
// Filename:      _includes/listeners/handleTempoScalingInput.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.handleTempoScalingInput = function (event) {
	this.DebugMessageFunction(event.key);
	let target = event.target;
	if (!target) {
		return;
	}
	if (target.id !== "tempo-scaling-input") {
		return;
	}
	let checkbox = document.querySelector("#checkbox-tempo-scaling");
	if (!checkbox) {
		return;
	}
	let checkState = checkbox.checked;

	let key = event.key;
	if (key === "Enter") {
		// Activate option and suppress propagation of event.
		if (!checkState) {
			checkbox.checked = true;
			event.stopPropagation();
			event.preventDefault();
			popc2.displayScore();
		}
	} else {
		// Deactivate option and do not suppress propagation of event.
		if (checkState) {
			checkbox.checked = false;
			popc2.displayScore();
		}
	}
	// Note: rendering the score with displayScore() is not necessary, and instead
	// the tempo scaling should be done with verovio.setOptions();

};

Object.defineProperty(POPC2.prototype.handleFreeFilterInput, "name", { value: "handleFreeFilterInput" });



