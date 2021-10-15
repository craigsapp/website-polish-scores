{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 23:53:54 PDT 2021
// Last Modified: Thu Oct 14 23:53:58 PDT 2021
// Filename:      _includes/listeners/keydownEventListener.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Event listener that handles keydown events, mostly
//                just sending them to the keyboard interface function.
//
{% endcomment %}

document.addEventListener("keydown", function(event) {
	if (!event) {
		return;
	}
	if (event.target.nodeName == "INPUT") {
		// Needed to prevent key commands when in text/lyrics search boxes.
		return;
	}

	console.log("EVENT", event);
	popc2.processKeyboardCommand(event);

});



