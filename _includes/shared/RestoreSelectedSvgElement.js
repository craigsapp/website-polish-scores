{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Apr  3 18:34:41 PDT 2022
// Last Modified: Sun Apr  3 18:34:45 PDT 2022
// Filename:      _includes/shared/RestoreSelectedSvgElement.js
// Used by:       _includes/work/displayWorkInfo.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Highlight the given element ID in the SVG image
//
{% endcomment %}

POPC2.prototype.RestoreSelectedSvgElement = function (svg, elementid) {
	this.DebugMessageFunction(elementid);

	if (!svg) {
		return;
	}
   if (!elementid) {
      return;
   }
   let item = svg.querySelector("#" + elementid);
   if (!item) {
      return;
   }
   let line;
   let matches = elementid.match(/L(\d+)/);
   if (matches) {
      line = parseInt(line);
		// line is not used on POPC2, but could be used when
		// displaying the Humdrum file that made the SVG, where
		// line is the line number of the Humdrum data that created
		// the given elementid object.
   } else {
		// The element ID
      return;
   }

	if (this.VARS.CURSOR_NOTE) {
		// Turn off old note highlight
      var classes = this.VARS.CURSOR_NOTE.getAttribute("class");
      var classlist = classes.split(" ");
      var outclass = "";
      for (var i=0; i<classlist.length; i++) {
         if (classlist[i] == "highlight") {
            continue;
         }
         outclass += " " + classlist[i];
      }
      outclass = outclass.replace(/^\s+/, "");
      this.VARS.CURSOR_NOTE.setAttribute("class", outclass);
	}
	if (item) {
		this.VARS.CURSOR_NOTE = item;
	}
	let counter = 0;
	if (this.VARS.CURSOR_NOTE) {
		let classes = this.VARS.CURSOR_NOTE.getAttribute("class");
		let classlist = classes.split(" ");
		let outclass = "";
		for (let i=0; i<classlist.length; i++) {
			if (classlist[i] != "highlight") {
				if (counter) {
					outclass += " ";
				}
				counter++;
				outclass += classlist[i];
			}
		}
		if (counter) {
			outclass += " ";
		}
		outclass += "highlight";
		this.VARS.CURSOR_NOTE.setAttribute("class", outclass);
	}
};

Object.defineProperty(POPC2.prototype.RestoreSelectedSvgElement, "name", { value: "RestoreSelectedSvgElement" });



