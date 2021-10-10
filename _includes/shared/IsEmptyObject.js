{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 10 00:34:13 PDT 2021
// Last Modified: Sun Oct 10 00:34:16 PDT 2021
// Filename:      _includes/shared/IsEmptyObject.js
// Used by:       _includes/browse/filterByComposer.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Check if a variable is an empty object.
//
{% endcomment %}

POPC2.prototype.IsEmptyObject = function (obj) {
	this.DebugMessageFunction();
	if (Object.prototype.toString.call(obj) !== "[object Object]") {
		return false;
	}
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}

Object.defineProperty(POPC2.prototype.IsEmptyObject, "name", { value: "IsEmptyObject" });



