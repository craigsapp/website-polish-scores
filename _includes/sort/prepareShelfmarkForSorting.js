{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 15:31:28 PDT 2021
// Last Modified: Thu Oct 21 10:32:43 PDT 2021
// Filename:      _includes/sort/prepareShelfmarkForSorting.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries by the number of notes in the score.
//                The input array is not sorted directly, since the
//                input is ususally the SEARCH_RESULTS array, which is
//                sometimes a copy of SCORE_INDEX (and better to avoid
//                sorting SCORE_INDEX at least for now).
//
{% endcomment %}

POPC2.prototype.prepareShelfmarkForSorting = function (input) {
	this.DebugMessageFunctionVerbose(input);
	let output = input.toLowerCase();

	function RomanNumber(value) {
		if (typeof value === 'string') {
			let num = parse(value);
			this.toInt = function() { return num; }
			this.toString = function() { return value; }
		} else if (typeof value === 'number') {
			let str = format(value);
			this.toInt = function() { return value; }
			this.toString = function() { return str; }
		} else {
			throw 'Invalid value';
		}

		function parse(str) {
			const VALUES = {
			            	'm' : 1000,
				'd' :  500, 'c' :  100,
				'l' :   50, 'x' :   10,
				'v' :    5, 'i' :    1,
			};

			let prev = 0, sum = 0;
			for (let i = 0; i < str.length; i++) {
				let curr = VALUES[str[i]];
				sum += (prev < curr) ? curr - 2 * prev : curr;
				prev = curr;
			}
			return sum;
		}

		function format(num) {
			const LETTERS = [
				                                         [1000, 'M'],
				[ 900, 'CM'], [ 500, 'D'], [ 400, 'CD'], [ 100, 'C'],
				[  90, 'XC'], [  50, 'L'], [  40, 'XL'], [  10, 'X'],
				[   9, 'IX'], [   5, 'V'], [   4, 'IV'], [   1, 'I'],
			];
	
		let str = '';
		for (let i=0; i<LETTERS.length; i++) {
			while (num >= LETTERS[i][0]) {
				str += LETTERS[i][1];
				num -= LETTERS[i][0];
			}
		}
		return str;
		}
	}

	// Convert Roman numbers to Arabic:
	matches = output.match(/\b([ivxlc]+)\b/);
	while (matches) {
		let roman = new RomanNumber(matches[1]);
		let arabic = roman.toInt().toString();
		let re = new RegExp(`\\b${roman}\\b`, "g")
		output = output.replace(re, `-${arabic}-`);
		matches = output.match(/\b([ivxlc]+)\b/);
	}

	// Convert Arabic numbers to 10-digit numbers, adding leading zeros if necessary:
	let outdigits = 10;
	// matches = output.match(/(?<!\.)\b(\d{1,4})\b/);
	matches = output.match(/\b(\d{1,4})\b/);
	while (matches) {
		let number = matches[1];
		let newnum = number;
		let zerolen = outdigits - number.length;
		for (let i=0; i<zerolen; i++) {
			newnum = `0${newnum}`;
		}
		// let re = new RegExp(`(?<!\\.)\\b${number}\\b`, "g")
		let re = new RegExp(`\\b${number}\\b`, "g")
		output = output.replace(re, newnum);
		// matches = output.match(/(?<!\.)\b(\d{1,4})\b/);
		matches = output.match(/\b(\d{1,4})\b/);
	}

	return output;
};

Object.defineProperty(POPC2.prototype.prepareShelfmarkForSorting, "name", { value: "prepareShelfmarkForSorting" });



