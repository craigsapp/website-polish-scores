//
// reference: https://github.com/rism-ch/verovio/blob/gh-pages/mei-viewer.xhtml
// vim: ts=3

LASTLINE = -1;
// used to highlight the current note at the location of the cursor.
let CursorNote;

// RestoreCursorNote: Used to go back to a highlighted note after a redraw.
// This is an ID string rather than an element.
let RestoreCursorNote;

//////////////////////////////
//
// playCurrentMidi -- If a note is selected start playing from that note;
// otherwise, start from the start of the music.
//

function playCurrentMidi() {
	if (CursorNote && CursorNote.id) {
		let id = CursorNote.id;
		vrvWorker.getTimeForElement(id)
		.then(function(time) {
			play_midi(time);
		});
	} else {
		play_midi();
	}
} 

//////////////////////////////
//
// play_midi --
//

var DELAY = 600;

function play_midi(starttime) {
console.warn("Entered play_midi, starttime=", starttime);
	starttime = starttime ? starttime : 0;
	if (starttime == 0) {
		DELAY = 600;
	} else {
		DELAY = 600;
	}

	vrvWorker.renderToMidi()
	.then(function (base64midi) {
		var song = 'data:audio/midi;base64,' + base64midi;
		$("#play-button").hide();
		$("#midiPlayer_play").show();
		$("#midiPlayer_stop").show();
		$("#midiPlayer_pause").show();
		$("#player").show();
		let player = document.querySelector("#player"); 
		if (player) { 
		   player.style.visibility = "visible";
			let onbutton = document.querySelector("#play-button");
			let offbutton = document.querySelector("#stop-button");
		   if (onbutton) {
			   onbutton.style.display = "none";
			}	
			if (offbutton) {
			   offbutton.style.display = "inline-block";
			}
		}

		$("#player").midiPlayer.play(song, starttime);
		PLAY = true;
		LASTLINE = -1;
	});
}




//////////////////////////////
//
// midiUpdate --
//

var adjust = 56;
var ids = [];
var midiUpdate = function (time) {

	var vrvTime = Math.max(0, time - DELAY);
	vrvWorker.getElementsAtTime(vrvTime)
	.then(function (elementsattime) {
		var matches;
		if (elementsattime.page > 0) {
			if (elementsattime.page != vrvWorker.page) {
				vrvWorker.page = elementsattime.page;
				loadPage();
			}
			if ((elementsattime.notes.length > 0) && (ids != elementsattime.notes)) {
				ids.forEach(function (noteid) {
						if ($.inArray(noteid, elementsattime.notes) == -1) {
						// $("#" + noteid ).attr("fill", "#000");
						// $("#" + noteid ).attr("stroke", "#000");
						// $("#" + noteid ).removeClassSVG("highlight");

						var element = document.querySelector("#" + noteid);
						if (element) {
							element.classList.remove("highlight");
						}

					}
				});
				ids = elementsattime.notes;
				// for (var i=0; i<ids.length; i++) {
				// 	if (matches = ids[i].match(/-L(\d+)/)) {
				// 		var line = matches[1];
				// 		if (line != LASTLINE) {
				// 			showIdInEditor(ids[i]);
				// 			LASTLINE = line;
				// 		}
				// 	}
				// }
				var scrollParent = document.querySelector("#humdrum-svg");
				const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
				var parentRect = scrollParent.getBoundingClientRect();
				var scrolled = false;
				var margin = 1/3;
				ids.forEach(function (noteid) {

						// $("#" + noteid ).attr("fill", "#c00");
						// $("#" + noteid ).attr("stroke", "#c00");;
						// $("#" + noteid ).addClassSVG("highlight");

						var element = document.querySelector("#" + noteid);
						if (element) {
							element.classList.add("highlight");
							/*
							var classes = element.getAttribute("class");
							var classlist = classes.split(" ");
							var outclass = "";
							for (var i=0; i<classlist.length; i++) {
								if (classlist[i] == "highlight") {
									continue;
								}
								outclass += " " + classlist[i];
							}
							outclass += " highlight";
							element.setAttribute("class", outclass);*/
							if (!scrolled) {
								let system = element.closest(".system");
								let rect;
								let nextsystem = system.nextElementSibling;
								if (system) {
									rect = system.getBoundingClientRect();
									/* Cannot use in Firefox:
									if (rect.top < parentRect.top) {
										scrollParent.scrollTop = scrollParent.scrollTop - (parentRect.top - rect.top) - rect.height * margin;
										scrolled = true;
									} else if (rect.bottom  > parentRect.bottom) {
										scrollParent.scrollTop = scrollParent.scrollTop + (rect.bottom - parentRect.bottom) + rect.height * margin;
										scrolled = true;
									}
									*/
									let nextrect;
									let recttop;
									let rectbottom;
									let rectheight;

									// Also need to deal with systems that are taller than view area...

									if (nextsystem) {
										let nextnextsystem = nextsystem.nextElementSibling;
										nextrect = nextsystem.getBoundingClientRect();
										recttop = rect.top;
										rectbottom = nextrect.top;
										rectheight = rectbottom - recttop;
									} else {
										recttop = rect.top;
										rectbottom = rect.bottom;
										rectheight = rectbottom - recttop;
									}
									if (recttop < 0) {
										// Scrolling backward in time:
										let absTop = recttop - (document.body.getBoundingClientRect().y + viewportHeight / 20 + adjust);
										window.scroll({left:0, top:absTop, behavior: 'auto'});
										scrolled = true;
									} else if (rectbottom > viewportHeight) {
										// Scrolling forward in time:
										// absTop is the absolute position of the current system on the page. 
										// Calculated by substracting relative top of the body from the relative top of the system 
										//     (with some offset (5% of the view window + playback progress bar height))
										let absTop = recttop - (document.body.getBoundingClientRect().y + viewportHeight / 20 + adjust);
										window.scroll({left:0, top:absTop, behavior: 'auto'});
										scrolled = true;
									}
								}
							}
						}

				});
			}
		}
	});
}




//////////////////////////////
//
// midiStop -- Callback for WildWestMidi when stopping MIDI playback.
//

var midiStop = function () {
	ids.forEach(function (noteid) {
		// $("#" + noteid ).attr("fill", "#000");
		// $("#" + noteid ).attr("stroke", "#000");
		// .removeClassSVG is not working:
		// $("#" + noteid ).removeClassSVG("highlight");

		var element = document.querySelector("#" + noteid);
		if (element) {
			var classes = element.getAttribute("class");
			var classlist = classes.split(" ");
			var outclass = "";
			for (var i=0; i<classlist.length; i++) {
				if (classlist[i] == "highlight") {
					continue;
				}
				outclass += " " + classlist[i];
			}
			element.setAttribute("class", outclass);
		}
	});
	//$("#player").hide();
	//$("#play-button").show();
	let player = document.querySelector("#player"); 
	if (player) {
	   player.style.visibility = "hidden";
	}
   let onbutton = document.querySelector("#play-button");
   let offbutton = document.querySelector("#stop-button");
   if (onbutton) {
      onbutton.style.display = "inline-block";
   }	
   if (offbutton) {
      offbutton.style.display = "none";
   }
	CursorNote = null;
	PLAY = false;
   LASTLINE = -1;
}



$.fn.addClassSVG = function (className) {
	$(this).attr('class', function (index, existingClassNames) {
		return existingClassNames + ' ' + className;
	});
	return this;
};


$.fn.removeClassSVG = function (className){
	$(this).attr('class', function (index, existingClassNames) {
		//var re = new RegExp(className, 'g');
		//return existingClassNames.replace(re, '');
	});
	return this;
};


