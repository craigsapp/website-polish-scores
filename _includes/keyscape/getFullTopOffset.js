{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 22:14:42 PDT 2021
// Last Modified: Fri Oct 22 22:14:46 PDT 2021
// Filename:      _includes/keyscape/getFullTopOffset.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Find the top absolute position of the element by summing
//                all ancestor left offsets together.
//
{% endcomment %}

POPC2.prototype.getFullTopOffset = function (element) {
   let output = parseInt(element.offsetTop);
   let current = element;
   while (current = current.offsetParent) {
      output += parseInt(current.offsetTop);
   }
   return output + 'px';
}

Object.defineProperty(POPC2.prototype.getFullTopOffset, "name", { value: "getFullTopOffset" });



