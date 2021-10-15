{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 14 20:50:43 PDT 2021
// Last Modified: Thu Oct 14 20:50:45 PDT 2021
// Filename:      _includes/listeners/observeSvgContent.js
// Used by:
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Watch the contenst of #notation for changes in the SVG
//                image inside of it.  If it changes, change problem
//                and sic markers to fontawesome characters.
//
{% endcomment %}

POPC2.prototype.observeSvgContent = function () {
	this.DebugMessageFunction();

   var content = document.querySelector("#notation");
	if (!content) {
		console.error("Error: Cannot find #notation element");
	}
   var i;
   var s;
   var callback = function(mList, observer) {
      var svg = content.querySelector("svg");
      if (svg) {
         // Mark encoding problem messages with red caution symbol.
         spans = svg.querySelectorAll("g.dir.problem tspan.rend tspan.text tspan.text");
         for (i=0; i<spans.length; i++) {
            s = spans[i];
            if (s.innerHTML === "P") {
               s.innerHTML = "&#xf071;";
               s.classList.add("p");
            }
         }

         // Mark encoding problem messages with green caution symbol.
         spans = svg.querySelectorAll("g.dir.sic tspan.rend tspan.text tspan.text");
         for (i=0; i<spans.length; i++) {
            s = spans[i];
            if (s.innerHTML === "S") {
               s.innerHTML = "&#xf071;";
               s.classList.add("s");
            }
         }
      }

      for (var mu in mList) {
         if (svg && svg.isSameNode(mList[mu].target)) {
            // remove busy class if svg changed
            // document.body.classList.remove("busy");
         }
      }
   }
   var observer = new MutationObserver(callback);

   observer.observe(content, { childList: true, subtree: true });
}

Object.defineProperty(POPC2.prototype.observeSvgContent, "name", { value: "observeSvgContent" });


