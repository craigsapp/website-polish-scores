{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 21:48:09 PDT 2021
// Last Modified: Sun Oct 24 06:32:26 PDT 2021
// Filename:      _includes/keyscape/printKeyInfo.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Print the measured key at the current cursor point in the
//                keyscape.
//
{% endcomment %}

POPC2.prototype.printKeyInfo = function (textElement, hexColor, suppress) {
	this.DebugMessageFunctionVerbose();

	let keyText = "";
	let sharp = '&#x266f;'
	let good = 1;
	let flat  = '<span style="line-height:100%; margin: 0 -0.18em 0 -0.18em;">&#x266d;</span>'

	let cleanedElement = document.querySelector("#checkbox-relative");
	let relativeQ = false;
	if (cleanedElement && cleanedElement.checked) {
		relativeQ = true;
	}

	// console.log("HEXCOLOR", hexColor);

	if (relativeQ) {

		if      (hexColor == '#00ff00') { keyText = 'I'; }
		else if (hexColor == '#21ff8d') { keyText = 'II-'; }
		else if (hexColor == '#3d5fff') { keyText = 'II'; }
		else if (hexColor == '#e50b52') { keyText = 'III-'; }
		else if (hexColor == '#ff0000') { keyText = 'III'; }
		else if (hexColor == '#ffff00') { keyText = 'IV'; }
		else if (hexColor == '#c1ff00') { keyText = 'V-'; }
		else if (hexColor == '#5dd4ff') { keyText = 'V'; }
		else if (hexColor == '#822eff') { keyText = 'VI-'; }
		else if (hexColor == '#ce24ff') { keyText = 'VI'; }
		else if (hexColor == '#ffa100') { keyText = 'VII-'; }
		else if (hexColor == '#ff6301') { keyText = 'VII'; }
		else if (hexColor == '#ff6302') { keyText = 'VII'; }
		else if (hexColor == '#ff6303') { keyText = 'VII'; }
		else if (hexColor == '#ff6304') { keyText = 'VII'; }
		else if (hexColor == '#fe6f08') { keyText = 'VII'; }
		else if (hexColor == '#ff6f03') { keyText = 'VII'; }
		else if (hexColor == '#ff6e03') { keyText = 'VII'; }
		else if (hexColor == '#fe6f04') { keyText = 'VII'; }

		else if (hexColor == '#00a200') { keyText = 'i'; }
		else if (hexColor == '#06c05a') { keyText = 'ii-'; }
		else if (hexColor == '#203ab6') { keyText = 'ii'; }
		else if (hexColor == '#203ab7') { keyText = 'ii'; }
		else if (hexColor == '#203ab8') { keyText = 'ii'; }
		else if (hexColor == '#b9144a') { keyText = 'iii-'; }
		else if (hexColor == '#b00000') { keyText = 'iii'; }
		else if (hexColor == '#ddc900') { keyText = 'iv'; }
		else if (hexColor == '#8dc900') { keyText = 'v-'; }
		else if (hexColor == '#3fa4b6') { keyText = 'v'; }
		else if (hexColor == '#3fa4b7') { keyText = 'v'; }
		else if (hexColor == '#3fa4b8') { keyText = 'v'; }
		else if (hexColor == '#6416b6') { keyText = 'vi-'; }
		else if (hexColor == '#8905b6') { keyText = 'vi'; }
		else if (hexColor == '#8905b7') { keyText = 'vi'; }
		else if (hexColor == '#8905b8') { keyText = 'vi'; }
		else if (hexColor == '#b65d0c') { keyText = 'vii-'; }
		else if (hexColor == '#d46b00') { keyText = 'vii'; }

		else {
			keyText = '';
			good = 0;
		}

	} else if (this.VARS.LANGUAGE === "PL") {

		if      (hexColor == '#00ff00') { keyText = 'C Dur'; }
		else if (hexColor == '#21ff8d') { keyText = 'Cis/Des Dur'; }
		else if (hexColor == '#3d5fff') { keyText = 'D Dur'; }
		else if (hexColor == '#e50b52') { keyText = 'Es Dur'; }
		else if (hexColor == '#ff0000') { keyText = 'E Dur'; }
		else if (hexColor == '#ffff00') { keyText = 'F Dur'; }
		else if (hexColor == '#c1ff00') { keyText = 'Fis/Ges Dur'; }
		else if (hexColor == '#5dd4ff') { keyText = 'G Dur'; }
		else if (hexColor == '#822eff') { keyText = 'As Dur'; }
		else if (hexColor == '#ce24ff') { keyText = 'A Dur'; }
		else if (hexColor == '#ffa100') { keyText = 'B Dur'; }
		else if (hexColor == '#ff6301') { keyText = 'H Dur'; }
		else if (hexColor == '#ff6302') { keyText = 'H Dur'; }
		else if (hexColor == '#ff6303') { keyText = 'H Dur'; }
		else if (hexColor == '#ff6304') { keyText = 'H Dur'; }
		else if (hexColor == '#fe6f08') { keyText = 'H Dur'; }
		else if (hexColor == '#ff6f03') { keyText = 'H Dur'; }
		else if (hexColor == '#ff6e03') { keyText = 'H Dur'; }
		else if (hexColor == '#fe6f04') { keyText = 'H Dur'; }

		else if (hexColor == '#00a200') { keyText = 'C Moll'; }
		else if (hexColor == '#06c05a') { keyText = 'Cis Moll'; }
		else if (hexColor == '#203ab6') { keyText = 'D Moll'; }
		else if (hexColor == '#203ab7') { keyText = 'D Moll'; }
		else if (hexColor == '#203ab8') { keyText = 'D Moll'; }
		else if (hexColor == '#b9144a') { keyText = 'Dis/Es Moll'; }
		else if (hexColor == '#b00000') { keyText = 'E Moll'; }
		else if (hexColor == '#ddc900') { keyText = 'F Moll'; }
		else if (hexColor == '#8dc900') { keyText = 'Fis Moll'; }
		else if (hexColor == '#3fa4b6') { keyText = 'G Moll'; }
		else if (hexColor == '#3fa4b7') { keyText = 'G Moll'; }
		else if (hexColor == '#3fa4b8') { keyText = 'G Moll'; }
		else if (hexColor == '#6416b6') { keyText = 'As Moll'; }
		else if (hexColor == '#8905b6') { keyText = 'A Moll'; }
		else if (hexColor == '#8905b7') { keyText = 'A Moll'; }
		else if (hexColor == '#8905b8') { keyText = 'A Moll'; }
		else if (hexColor == '#b65d0c') { keyText = 'B Moll'; }
		else if (hexColor == '#d46b00') { keyText = 'H Moll'; }

		else {
			keyText = '';
			good = 0;
		}

	} else {
		// English version of text

		if      (hexColor == '#00ff00') { keyText = 'C major'; }
		else if (hexColor == '#21ff8d') { keyText = 'C'+sharp+'/D'+flat+' major'; }
		else if (hexColor == '#3d5fff') { keyText = 'D major'; }
		else if (hexColor == '#e50b52') { keyText = 'E'+flat+' major'; }
		else if (hexColor == '#ff0000') { keyText = 'E major'; }
		else if (hexColor == '#ffff00') { keyText = 'F major'; }
		else if (hexColor == '#c1ff00') { keyText = 'F'+sharp+'/G'+flat+' major'; }
		else if (hexColor == '#5dd4ff') { keyText = 'G major'; }
		else if (hexColor == '#822eff') { keyText = 'A'+flat+' major'; }
		else if (hexColor == '#ce24ff') { keyText = 'A major'; }
		else if (hexColor == '#ffa100') { keyText = 'B'+flat+' major'; }
		else if (hexColor == '#ff6301') { keyText = 'B major'; }
		else if (hexColor == '#ff6302') { keyText = 'B major'; }
		else if (hexColor == '#ff6303') { keyText = 'B major'; }
		else if (hexColor == '#ff6304') { keyText = 'B major'; }
		else if (hexColor == '#fe6f08') { keyText = 'B major'; }
		else if (hexColor == '#ff6f03') { keyText = 'B major'; }
		else if (hexColor == '#ff6e03') { keyText = 'B major'; }
		else if (hexColor == '#fe6f04') { keyText = 'B major'; }

		else if (hexColor == '#00a200') { keyText = 'C minor'; }
		else if (hexColor == '#06c05a') { keyText = 'C'+sharp+' minor'; }
		else if (hexColor == '#203ab6') { keyText = 'D minor'; }
		else if (hexColor == '#203ab7') { keyText = 'D minor'; }
		else if (hexColor == '#203ab8') { keyText = 'D minor'; }
		else if (hexColor == '#b9144a') { keyText = 'D'+sharp+'/E'+flat+' minor'; }
		else if (hexColor == '#b00000') { keyText = 'E minor'; }
		else if (hexColor == '#ddc900') { keyText = 'F minor'; }
		else if (hexColor == '#8dc900') { keyText = 'F'+sharp+' minor'; }
		else if (hexColor == '#3fa4b6') { keyText = 'G minor'; }
		else if (hexColor == '#3fa4b7') { keyText = 'G minor'; }
		else if (hexColor == '#3fa4b8') { keyText = 'G minor'; }
		else if (hexColor == '#6416b6') { keyText = 'A'+flat+' minor'; }
		else if (hexColor == '#8905b6') { keyText = 'A minor'; }
		else if (hexColor == '#8905b7') { keyText = 'A minor'; }
		else if (hexColor == '#8905b8') { keyText = 'A minor'; }
		else if (hexColor == '#b65d0c') { keyText = 'B'+flat+' minor'; }
		else if (hexColor == '#d46b00') { keyText = 'B minor'; }

		else {
			keyText = '';
			good = 0;
		}

	}

	let initialized = this.VARS.KEYSCAPE.INITIALIZED;
	if (!initialized) {
		if (keyText != '') {
			keyText = '<span height="40px" style="color:' + hexColor + ';'
					+ ' font-family:Arial; font-weight:bold; font-size:32px;'
					+ ' text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'
					+ '">'
					+ keyText + '</span>';
		}

		if (textElement != undefined) {
			textElement.innerHTML = keyText;
		}
	}

	if (!suppress && !this.VARS.KEYSCAPE.FREEZE) {
		if (keyText != '') {
			keyText = '<span height="40px" style="color:' + hexColor + ';'
					+ ' font-family:Arial; font-weight:bold; font-size:32px;'
					+ ' text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'
					+ '">'
					+ keyText + '</span>';
		}

		if (textElement != undefined) {
			textElement.innerHTML = keyText;
		}
	}

	return good;
};

Object.defineProperty(POPC2.prototype.printKeyInfo, "name", { value: "printKeyInfo" });



