{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 08:15:13 PDT 2021
// Last Modified: Tue Oct 12 08:15:16 PDT 2021
// Filename:      _includes/shared/FlipName.js
// Used by:       _includes/work/displayWorkInfo.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Reverse "last, first" for Names.
//
{% endcomment %}

POPC2.prototype.FlipName = function (name) {
	this.DebugMessageFunctionVerbose(name);
	let matches = name.match(/^\s*([^,]+)\s*,\s*(.+)\s*$/);
	if (!matches) {
		return name;
	}
	let first = matches[2];
	let last = matches[1];

	return `${first} ${last}`;
};

Object.defineProperty(POPC2.prototype.FlipName, "name", { value: "FlipName" });


