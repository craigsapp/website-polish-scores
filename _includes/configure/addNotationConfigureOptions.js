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
	let shedk = []; // shed filters that should only be applied to **kern spines.
	let shed = [];  // shed filters that should be applied to any spine (or no spines).
	let element;
	let shedkEntryCount = {};
	let shedEntryCount = {};
	let hasModFilter = false;
	let addModFilter = false;

	if (this.VARS.MODERNIZE) {
		// Add modernization filter
		// First check if there is a !!!filter-modern: line in the Humdrum data
		let humdrum = this.GetHumdrumOnPage();
		let lines = humdrum.split(/\r?\n/);
		hasModFilter = false;

		// The filter is more likely at the bottom of the file, so
		// search backwards in the file:
		for (let i=lines.length-1; i>0; i--) {
			if (lines[i].match(/^!!!filter-modern:/)) {
				hasModFilter = true;
				console.error("MODERN FILTER", lines[i]);
				break;
			}
		}
		if (!hasModFilter) {
			addModFilter = true;
		}
	}

	if (addModFilter) {
		// Add a default modernization filter if no
		// !!!filter-modern: line found in file.
		// Modernize stem directions
		let entry = "s/2.right//I; s/all.right//I";
		if (!shedkEntryCount[entry]) {
			shedkEntryCount[entry] = 1;
			shedk.push(entry);
		}

		// Unhide barlines
		entry = "s/-//B";
		if (!shedEntryCount[entry]) {
			shedEntryCount[entry] = 1;
			shed.push(entry);
		}
	}

	// Display music with modern stemming
	element = document.querySelector("#checkbox-stemming");
	if (element) {
		if (element.checked) {
			let entry = "s/2.right//I; s/all.right//I";
			if (!shedkEntryCount[entry]) {
				shedkEntryCount[entry] = 1;
				shedk.push(entry);
			}
		}
	}

	// Display music without C clefs
	element = document.querySelector("#checkbox-nocclefs");
	if (element) {
		if (element.checked) {
			let entry = "s/^clefC[12]/clefG2/I; s/^clefC[34]/clefGv2/I; s/^clefC5/clefF4/I; s/^clefF[35]/clefF4/I; s/^clefG[13]/clefG2/I";
			shedk.push(entry);
		}
	}

	// Show hidden notes
	element = document.querySelector("#checkbox-shownotes");
	if (element) {
		if (element.checked) {
			let entry = "s/yy//";
			shedk.push(entry);
		}
	}

	// Expand repeat marks
	element = document.querySelector("#checkbox-expandrep");
	if (element) {
		if (element.checked) {
			let entry = "s/^rep$/Xrep/I";
			shedk.push(entry);
		}
	}

	// Sounding score (remove transposition information)
	element = document.querySelector("#checkbox-soundingscore");
	if (element) {
		if (element.checked) {
			let entry = "s/^ITrd/XITrd/I";
			shedk.push(entry);
		}
	}

	// Hide sic warnings
	element = document.querySelector("#checkbox-sic-hide");
	if (element) {
		if (element.checked) {
			let entry = "s/^LO:SIC:/LO:XSIC:/L";
			shed.push(entry);
		}
	}

	// Hide problem markers (always) (local and global comments)
	shed.push("s/^LO:TX.*:problem.*//LG");

	// Show custodes
	element = document.querySelector("#checkbox-show-custodes");
	if (element) {
		if (!element.checked) {
			let entry = "s/^custos/Custos/I";
			shedk.push(entry);
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

	if (shedk.length > 0) {
		// create shedk filter
		let sstring = "shed -k -e '";
		for (let i=0; i<shedk.length; i++) {
			sstring += shedk[i];
			if (i < shedk.length - 1) {
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

	// Apply sic corrections
	element = document.querySelector("#checkbox-sic-apply");
	if (element) {
		if (element.checked) {
			options.filter.push("sic -s");
		}
	}

	if (addModFilter) {
		// Substitute SICs with corrections:
		// maybe check to see if sic filter not already present.
		options.filter.push("sic -s");

		// Split rests and notes going over barlines:
		options.filter.push("tie -s");

		// Modernize letters
		options.filter.push("humtr -p");
	}

	if (hasModFilter) {
		// Activate the modern filter line:
		options.filter.push("filter -v modern");
	}

	// Display text with modern letters
	element = document.querySelector("#checkbox-letters");
	if (element) {
		if (element.checked) {
			options.filter.push("humtr -p");
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

	// Automatic note stems directions
	element = document.querySelector("#checkbox-autostems");
	if (element) {
		if (element.checked) {
			let entry = "autostem -r";
			options.filter.push(entry);
		}
	}

	// Suppress lyrics
	element = document.querySelector("#checkbox-nolyrics");
	if (element) {
		if (element.checked) {
			// Could also add **silbe, but **text is probably only used
			let entry = "extract -I text";
			options.filter.push(entry);
		}
	}

	// Transposition
	element = document.querySelector("#select-transposition");
	if (element) {
		value = element.value;
		if (value) {
			let entry = `transpose -t ${value}`;
			options.filter.push(entry);
		}
	}

	// Add keyscape measure range selection:
	if (this.VARS.WORK_ID && (this.VARS.WORK_ID === this.VARS.KEYSCAPE.ID)) {
		let starting = this.VARS.KEYSCAPE.SELECT_START_MEASURE || 0;
		let ending   = this.VARS.KEYSCAPE.SELECT_END_MEASURE   || 0;
		if (starting >= 0) {
			options.filter.push(`myank -m ${starting}-${ending}`);
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

	// Tight spacing
	element = document.querySelector("#checkbox-tightspacing");
	options.spacingLinear = 0.25;
	options.spacingNonLinear = 0.60;
	if (element) {
		if (element.checked) {
			options.spacingLinear = 0.1;
			options.spacingNonLinear = 0.3;
		}
	}

	// Original system breaks
	element = document.querySelector("#checkbox-original-sysbreaks");
	options.breaks = "auto";
	if (element) {
		if (element.checked) {
			options.breaks = "encoded";
		}
	}

	this.updateConfigurationOptionsInUrl();

	console.warn("NOTATION FILTERS", options);
	return options;
};

Object.defineProperty(POPC2.prototype.addNotationConfigureOptions, "name", { value: "addNotationConfigureOptions" });



