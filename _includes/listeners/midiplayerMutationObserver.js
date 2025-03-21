{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Feb  6 19:18:33 PST 2024
// Last Modified: Tue Feb  6 22:02:18 PST 2024
// Filename:      _includes/listeners/MidiplayerMutationObserver.js
// Used by:
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Watch #tools, and limit the position of #player to prevent it from entering #tools.
//
{% endcomment %}


document.addEventListener("DOMContentLoaded", function() {
	let navigatorDiv = document.querySelector("#navigator");
	let toolDiv      = document.querySelector("#tools");
	let comlibDiv    = document.querySelector("#comlib");
	let playerDiv    = document.querySelector("#player");

	if (!navigatorDiv) {
		console.error("Cannot find #navigator div for mutation observer");
		return;
	}
	if (!toolDiv) {
		console.error("Cannot find #tools div for mutation observer");
		return;
	}
	if (!playerDiv) {
		console.error("Cannot find #player div for mutation observer");
		return;
	}
	if (!comlibDiv) {
		console.error("Cannot find #comlib div for mutation observer");
		return;
	}


	function checkPlayerPosition(navigatorDiv, toolDiv, playerDiv, comlibDiv) {

		let navigatorRect   = navigatorDiv.getBoundingClientRect();
		let toolRect        = toolDiv.getBoundingClientRect();
		let comlibRect      = comlibDiv.getBoundingClientRect();

		let navigatorBottom = window.pageYOffset + navigatorRect.top + navigatorRect.height;
		let toolBottom      = window.pageYOffset + toolRect.top      + toolRect.height;
		let comlibBottom    = window.pageYOffset + comlibRect.top    + comlibRect.height;

		let bottom = navigatorBottom;
		if (bottom < toolBottom) {
			bottom = toolBottom;
		}
		if (bottom < comlibBottom) {
			bottom = comlibBottom;
		}

		playerDiv.style.position = "absolute";
		playerDiv.style.top = bottom + "px";
	}


	const ToolsObserver = new MutationObserver(() => {
		checkPlayerPosition(navigatorDiv, toolDiv, playerDiv, comlibDiv);
	});

	const config = {
		attributes: true,
		childList:  true,
		subtree:    true,
	};

	ToolsObserver.observe(toolDiv, config);

	let ticking = false;

   window.addEventListener('load', function () {
		checkPlayerPosition(navigatorDiv, toolDiv, playerDiv, comlibDiv);
	});
   window.addEventListener('scroll', function () {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				checkPlayerPosition(navigatorDiv, toolDiv, playerDiv, comlibDiv);
				ticking = false;
			});
			ticking = true;
		}
	});

});



