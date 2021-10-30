{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 13:48:59 PDT 2021
// Last Modified: Sat Oct 30 13:49:02 PDT 2021
// Filename:      _includes/sort/sortByComposer.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries by composer.  Anonymous will be placed last, and ties
//                will be reolved by sorting by title.
//
{% endcomment %}

POPC2.prototype.sortByComposer = function (index, reverse) {
	this.DebugMessageFunction();

	let newlist = [];
	if (!index) {
		return newlist;
	}

	for (let i=0; i<index.length; i++) {
		newlist.push(index[i]);
	}

	newlist.sort(function (a, b) {
		let comA = a.COM || "";
		let comB = b.COM || "";
		if (comA !== comB) {
			if (comA.match(/^anon/i) && !comB.match(/^anon/i)) {
				return +1;
			} else if ((!comA.match(/^anon/i)) && comB.match(/^anon/i)) {
				return -1;
			}
			return comA.localeCompare(comB);
		}

		let otlA       = a.OTL       || "";
		let otlB       = b.OTL       || "";
		let oprA       = a.OPR       || "";
		let oprB       = b.OPR       || "";

		let titleA = oprA || otlA;
		let titleB = oprB || otlB;

		titleA = titleA.replace(/[^.A-Za-z0-9]/g, "");
		titleB = titleB.replace(/[^.A-Za-z0-9]/g, "");

		if (titleA !== titleB) {
			let firstA = titleA.charAt(0);
			let firstB = titleB.charAt(0);

			// Sorting numbers for titles at the end of the list
			if ((!isNaN(firstA)) && (isNaN(firstB))) {
				return +1;
			}
			if ((isNaN(firstA)) && (!isNaN(firstB))) {
				return -1;
			}

			return titleA.localeCompare(titleB);
		}

		// To break ties remaining ties, sort by siglum/shelfmark/shelfwork
		let siglumA = a.siglum || "";
		let siglumB = b.siglum || "";
		if (siglumA !== siglumB) {
			return siglumA.localeCompare(siglumB);
		}

		let shelfmarkA = a.shelfmark || "";
		let shelfmarkB = b.shelfmark || "";
		if (shelfmarkA !== shelfmarkB) {
			return shelfmarkA.localeCompare(shelfmarkB);
		}

		let shelfworkA = a.shelfworkA || "";
		let shelfworkB = b.shelfworkB || "";
		if (shelfworkA !== shelfworkB) {
			return shelfworkA.localeCompare(shelfworkB);
		}

		// The two entries are the same (but should not be)
		return 0;

	});

	if (reverse) {
		newlist.reverse();
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByComposer, "name", { value: "sortByComposer" });



