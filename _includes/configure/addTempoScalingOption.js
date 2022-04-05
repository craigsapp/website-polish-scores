{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Apr  2 19:58:51 PDT 2022
// Last Modified: Sat Apr  2 19:58:56 PDT 2022
// Filename:      _includes/configure/addTempoScalingOption.js
// Used by:
// Included in:   _includes/configure/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get tempo scaling option from notation configuration
//                subpage on the workpage.
//
{% endcomment %}

POPC2.prototype.addTempoScalingOption = function (options) {
	options.midiTempoAdjustment = 1.0;
	let element = document.querySelector("#checkbox-tempo-scaling");
	if (element) {
		if (element.checked) {
			let ielement = document.querySelector("#tempo-scaling-input");
			if (ielement) {
				let value = ielement.value;
				if (value && value.match(/^\s*(\d|\.\d)/)) {
					value = parseFloat(value);
					if (value > 4.0) {
						value /= 100.0;
					}
					if (value > 4.0) {
						value = 4.0;
					}
					if (value < 0.2) {
						value = 0.2;
					}
					options.midiTempoAdjustment = value;
				}
			}
		}
	}
	return options;
};

Object.defineProperty(POPC2.prototype.addTempoScalingOption, "name", { value: "addTempoScalingOption" });



