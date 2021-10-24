{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 23 16:11:28 PDT 2021
// Last Modified: Sat Oct 23 16:11:30 PDT 2021
// Filename:      _includes/keyscape/getFullLeftOffset.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Find the left absolute position of the element by summing
//                all ancecstor left offsets together.
//
{% endcomment %}

POPC2.prototype.getFullLeftOffset = function (element) {
   let output = parseInt(element.offsetLeft);
   let current = element;
   while (current = current.offsetParent) {
      output += parseInt(current.offsetLeft);
   }
   return output + 'px';
}

Object.defineProperty(POPC2.prototype.getFullLeftOffset, "name", { value: "getFullLeftOffset" });



