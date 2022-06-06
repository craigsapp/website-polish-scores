//
// reference: https://github.com/rism-ch/verovio/blob/gh-pages/mei-viewer.xhtml
// vim: ts=3

LASTLINE = -1;

//////////////////////////////
//
// playCurrentMidi -- If a note is selected start playing from that note;
// otherwise, start from the start of the music.
//

function playCurrentMidi(starttime, stoptime) {
	if (popc2.VARS.CURSOR_NOTE && popc2.VARS.CURSOR_NOTE.id) {
		let id = popc2.VARS.CURSOR_NOTE.id;
		vrvWorker.getTimeForElement(id)
		.then(function(time) {
			play_midi(time);
		});
	} else {
		play_midi(starttime, stoptime);
	}
} 



//////////////////////////////
//
// play_midi --
//

var DELAY = 600;  // related to audio buffer size, "slots, and sample rate

function play_midi(starttime, stoptime) {


	starttime = starttime ? starttime : 0;
console.warn("STARTING PLAY_MIDI", starttime, stoptime);

	if (starttime == 0) {
		DELAY = 600;
	} else {
		DELAY = 600;
	}

	vrvWorker.renderToTimemap()
	.then(function(timemap) {
console.error("RENDERED TO TIMEMAP", timemap);
		popc2.insertElementsIntoTimemap(timemap);
		popc2.VARS.TIMEMAP = timemap;
		popc2.VARS.TIMEMAP_ID = popc2.VARS.WORK_ID;
		popc2.VARS.TIMEMAP_READ_POINTER = -1;
		if (starttime > 0) {
			popc2.VARS.TIMEMAP_READ_POINTER = getStartTimemapIndex(popc2.VARS.TIMEMAP, starttime);
		}
console.warn("TIMEMAP READ POINTER", popc2.VARS.TIMEMAP_READ_POINTER, "AT TIME", starttime);
		vrvWorker.renderToMidi()
		.then(function (base64midi) {
console.error("RENDERED TO MIDI", base64midi);
			var mididata = 'data:audio/midi;base64,' + base64midi;
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
	
			$("#player").midiPlayer.play(mididata, starttime);
			PLAY = true;
			LASTLINE = -1;

			if (stoptime) {
				let duration = stoptime - starttime;
				console.warn("STOPPING MIDI IN", duration, "ms.");
				if (duration > 0.0) {
					setTimeout(function () {
						console.warn("STOPPING MIDI");
						stop();
					}, duration);
				}
			}
		})
	});
}



//////////////////////////////
//
// getStartTimemapIndex --
//

function getStartTimemapIndex(timemap, starttime) {
	let index = 0;
	let tsize = timemap.length;
	for (let i=0; i<tsize; i++) {
		if ((i + 1000 < tsize) && (timemap[i+1000] < starttime)) {
			i += 1000;
			continue;
		} else if ((i + 100 < tsize) && (timemap[i+100] < starttime)) {
			i += 100;
			continue;
		} else if ((i + 10 < tsize) && (timemap[i+10] < starttime)) {
			i += 10;
			continue;
		}
		if (timemap[i] < starttime) {
			continue;
		} else if (timemap[i] == starttime) {
			return i-1;
		} else if (timemap[i] > starttime) {
			return i-1;
		}
		return i;
	}
	return tsize;
}



//////////////////////////////
//
// getCurrentTimemapIndex --
//

function getCurrentTimemapIndex(timemap, starttime, lastindex) {
	// let buffer = 20;
	let tsize = timemap.length;
	let startindex = lastindex;
	if (lastindex < 0) {
		lastindex = 0;
	}
	for (let i=0; i<tsize; i++) {
		if ((i + 1000 < tsize) && (timemap[i+1000].tstamp < starttime)) {
			i += 1000;
			continue;
		} else if ((i + 100 < tsize) && (timemap[i+100].tstamp < starttime)) {
			i += 100;
			continue;
		} else if ((i + 10 < tsize) && (timemap[i+10].tstamp < starttime)) {
			i += 10;
			continue;
		}
		if (timemap[i].tstamp < starttime) {
			continue;
		} else if (timemap[i].tstamp == starttime) {
			return i;
		} else if (timemap[i].tstamp > starttime) {
			return i-1;
		}
	}
	return tsize;
}



//////////////////////////////
//
// midiUpdate --
//

var adjust = 56;
var ids = [];
var midiUpdate = function (time) {
	var vrvTime = Math.max(0, time - DELAY);
	if (popc2.VARS.PAGED) {
		doPagedTiming(vrvTime);
	} else {
		doPagedTiming(vrvTime);
		// doUnpagedTiming(vrvTime);
	}
}


//////////////////////////////
//
// doUnpagedTiming --
//


var doUnpagedTiming = function (vrvTime) {
	if (!popc2.VARS.TIMEMAP) {
		return;
	}
	let nextindex = getCurrentTimemapIndex(popc2.VARS.TIMEMAP, vrvTime, popc2.VARS.TIMEMAP_READ_POINTER);
	if (nextindex == popc2.VARS.TIMEMAP_READ_POINTER) {
		return;
	}
	let start = popc2.VARS.TIMEMAP_READ_POINTER;
	if (start < 0) {
		start = 0;
	}
	if (start >= popc2.VARS.TIMEMAP.length) {
		return;
	}
	for (let i=start; i<=nextindex; i++) {
		processEntry(popc2.VARS.TIMEMAP, i);
	}
	popc2.VARS.TIMEMAP_READ_POINTER = nextindex;
}



//////////////////////////////
//
// processEntry --
//

function processEntry(timemap, index) {
	let entry = timemap[index];
	if (typeof entry === "undefined") {
		return;
	}

	// turn off notes:
	if (typeof entry.eoff !== "undefined") {
		let eoff = entry.eoff;
		for (let i=0; i<eoff.length; i++) {
			if (eoff[i]) {
				eoff[i].classList.remove("highlight");
			}
		}
	}

	// turn on notes:
	if (typeof entry.eon !== "undefined") {
		let eon = entry.eon;
		for (let i=0; i<eon.length; i++) {
			if (eon[i]) {
				eon[i].classList.add("highlight");
			}
		}
	}

/*
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
				element.setAttribute("class", outclass);
/
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
/
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
*/

}



var doPagedTiming = function (vrvTime) {

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

};




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
	popc2.VARS.CURSOR_NOTE = null;
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


