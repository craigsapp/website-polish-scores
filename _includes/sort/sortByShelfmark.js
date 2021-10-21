{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 10:27:12 PDT 2021
// Last Modified: Thu Oct 21 10:27:15 PDT 2021
// Filename:      _includes/sort/sortByShelfmark.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries by the shelfmark entry in the score index.
//                Sorting ties are broken by shelfwork entry, which optionally
//                enumerates works in the shelfmark and movements within each
//                work.
//
{% endcomment %}

POPC2.prototype.sortByShelfmark = function (index, reverse) {
	this.DebugMessageFunction();

	let newlist = [];
	if (!index) {
		return newlist;
	}

	for (let i=0; i<index.length; i++) {
		newlist.push(index[i]);
	}

	newlist.sort(function (a, b) {
		let siglumA    = a.siglum    || "";
		let siglumB    = b.siglum    || "";
		let shelfmarkA = a.shelfmark || "";
		let shelfmarkB = b.shelfmark || "";
		let shelfworkA = a.shelfwork || "";
		let shelfworkB = b.shelfwork || "";

		// Need to expand numbers in shelfmarks here to allow
		// sorting numbers alphabetically.

		let stringA = `${siglumA} ${shelfmarkA} ${shelfworkA}`;
		let stringB = `${siglumB} ${shelfmarkB} ${shelfworkB}`;
		stringA = stringA.toLowerCase();
		stringB = stringB.toLowerCase();

		return stringA.localeCompare(stringB);
	});

	if (reverse) {
		newlist.reverse();
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByShelfmark, "name", { value: "sortByShelfmark" });



