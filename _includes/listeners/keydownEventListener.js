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
	if ((event.target.nodeName === "INPUT") && (event.target.id === "filter-input")) {
		// Monitor free-form filter box on configuration menu so that
		// the Enter key can activate the filter, and typing other
		// keys in the box will automatically disable the filter (and
		// pressing Enter or clicking on the checkbox is necessary to
		// reactivate the filter).
		popc2.handleFreeFilterInput(event);
		return;
	} else if (event.target.nodeName === "INPUT") {
		// Needed to prevent key commands when in text/lyrics search boxes.
		return;
	}
	popc2.processKeyboardCommand(event);
});



