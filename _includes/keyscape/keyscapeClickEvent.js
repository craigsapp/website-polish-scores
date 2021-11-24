{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 25 09:09:26 PDT 2021
// Last Modified: Mon Oct 25 09:09:29 PDT 2021
// Filename:      _includes/keyscape/keyscapeClickEvent.html
// Used by:       _includes/listeners/keyscapeListeners.js
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   When clicking in the keyscape, start playing the
//                selected region of music.
//
{% endcomment %}

POPC2.prototype.keyscapeClickEvent = function (event) {

	let position = popc2.findPos(cursor);
	let mouseX = event.pageX - position.x;
	let mouseY = event.pageY - position.y;

	// Decide if the coordinate is within the triangle.
	// The good region is in a triangle described by the
	// coordinates:
	// (299, 0)  = center top point of triangle
	// (0, 299)  = left bottom point of triangle
	// 599, 299) = right bottom point of triangle

	let distanceToCenter = Math.abs(299 - mouseX);
	let triangleEdge = mouseY;
	if (distanceToCenter > triangleEdge) {
		// console.warn(`CLICK OUT OF TRIANGLE: (${mouseX}, ${mouseY})`);
		return;
	}
	// console.warn(`CLICK IN TRIANGLE: (${mouseX}, ${mouseY})`);

	let b1 = mouseX + mouseY;
	let newx1 = b1 - 300;

	let b2 = mouseY - mouseX;
	let newx2 = 300 - b2;

	let qrange = popc2.getQuarterNoteRange(newx1, newx2);
	// console.warn(`PLAY from quarter note ${qrange.qstart} to ${qrange.qend}`);
	let timerange = popc2.getTimeRange(qrange.qstart, qrange.qend);

	// console.warn("TIMERANGE", timerange);
	// console.warn("START TIME", timerange["start-time"], "END TIME", timerange["end-time"]);

	if (event.altKey) {
		// Go to first measure in range of mouse selection (do not start MIDI playback).
		if (typeof popc2.VARS.KEYSCAPE_INFO === "undefined") {
			return;
		}
		let id = popc2.VARS.WORK_ID;
		if (!id) {
			return;
		}
		if (popc2.VARS.KEYSCAPE_INFO[id].length != 300) {
			return;
		}
		let b1 = mouseX + mouseY;
		let startpx = b1 - 300;
		let startcol = parseInt(startpx / 2)
		if (startcol < 0)  { startcol = 0; }
		let startmeasure = popc2.VARS.KEYSCAPE_INFO[id][startcol].startbar;
		// console.error("START MEASURE", startmeasure);
		popc2.gotoMeasure(startmeasure);
	} else {
		playCurrentMidi(timerange["start-time"], timerange["end-time"]);
	}

	event.preventDefault();
	event.stopPropagation();

};

Object.defineProperty(POPC2.prototype.keyscapeClickEvent, "name", { value: "keyscapeClickEvent" });



