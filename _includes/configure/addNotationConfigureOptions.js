{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 23 01:38:24 PDT 2021
// Last Modified: Sat Oct 23 01:38:26 PDT 2021
// Filename:      _includes/configure/addNotationConfigureOptions.js
// Used by:
// Included in:   _includes/configure/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get notation rendering options from notation configuration
//                subpage on the workpage.
//
{% endcomment %}

POPC2.prototype.addNotationConfigureOptions = function (options) {
	let shed = [];
	let element;

	// Display music with modern stemming
	element = document.querySelector("#checkbox-stemming");
	if (element) {
		if (element.checked) {
			let entry = "s/2.right//I; s/all.right//I";
			shed.push(entry);
		}
	}

	// Display music without C clefs
	element = document.querySelector("#checkbox-nocclefs");
	if (element) {
		if (element.checked) {
			let entry = "s/^clefC[12]/clefG2/I; s/^clefC[34]/clefGv2/I; s/^clefC5/clefF4/I; s/^clefF[35]/clefF4/I; s/^clefG[13]/clefG2/I";
			shed.push(entry);
		}
	}

	// Show hidden notes
	element = document.querySelector("#checkbox-shownotes");
	if (element) {
		if (element.checked) {
			let entry = "s/yy//";
			shed.push(entry);
		}
	}

	// Expand repeat marks
	element = document.querySelector("#checkbox-expandrep");
	if (element) {
		if (element.checked) {
			let entry = "s/^rep$/Xrep/I";
			shed.push(entry);
		}
	}

	// Sounding score (remove transposition information)
	element = document.querySelector("#checkbox-soundingscore");
	if (element) {
		if (element.checked) {
			let entry = "s/^ITrd/XITrd/I";
			shed.push(entry);
		}
	}

	if (shed.length > 0) {
		// create shed filter
		let sstring = "shed -e '";
		for (let i=0; i<shed.length; i++) {
			sstring += shed[i];
			if (i < shed.length - 1) {
				sstring += "; ";
			}
		}
		sstring += "'";

		if (options.filter && Array.isArray(options.filter)) {
			options.filter.push(sstring);
		} else {
			options.filter = [];
			options.filter.push(sstring);
		}

	}
	if (!options.filter) {
		options.filter = [];
	}

	// Correct sic
	element = document.querySelector("#checkbox-sic");
	if (element) {
		if (element.checked) {
			let entry = "sic -s";
			options.filter.push(entry);
		}
	}

	// Add free-form filter option
	element = document.querySelector("#checkbox-filter");
	if (element) {
		if (element.checked) {
			let ielement = document.querySelector("#filter-input");
			if (ielement) {
				let value = ielement.value;
				if (value && !value.match(/^\s*$/)) {
					options.filter.push(value);
				}
			}
		}
	}

	// Automatic note stems
	element = document.querySelector("#checkbox-autostems");
	if (element) {
		if (element.checked) {
			let entry = "autostem -r";
			options.filter.push(entry);
		}
	}

	// Encoded system breaks
	element = document.querySelector("#checkbox-systembreaks");
	options.breaks = "auto";
	if (element) {
		if (element.checked) {
			options.breaks = "encoded";
		}
	}

	element = document.querySelector("#checkbox-tightspacing");
	options.spacingLinear = 0.25;
	options.spacingNonLinear = 0.60;
	if (element) {
		if (element.checked) {
			options.spacingLinear = 0.1;
			options.spacingNonLinear = 0.3;
		}
	}

	return options;
};

Object.defineProperty(POPC2.prototype.addNotationConfigureOptions, "name", { value: "addNotationConfigureOptions" });



