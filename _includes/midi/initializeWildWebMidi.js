{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 26 00:21:06 PDT 2021
// Last Modified: Tue Oct 26 00:21:09 PDT 2021
// Filename:      _includes/midi/initializeWildWebMidi.html
// Included in:   _includes/midi/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Initialization script for WildWebMidi.
//
{% endcomment %}


//////////////////////////////
//
// initializeWildWebMidi -- Prepare WildWebMidi for playing MIDI files.
//

function initializeWildWebMidi() {
   $("#player").midiPlayer({
      color: null,
      // color: "#c00",
      onUnpdate: midiUpdate,
      onStop: midiStop,
      width: 250
   });

   $("#input").keydown(function() {
         stop();
   });

	//////////////////////////////
	//
   // window blur event listener -- Stop MIDI playback.  It is computaionally
   //      expensive and sounds bad if the window is not in focus.

   window.addEventListener("blur", function() {
      pause();
   });

}



