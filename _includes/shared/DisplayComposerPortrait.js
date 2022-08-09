{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Tue Aug  9 12:29:22 CEST 2022
// Filename:      _includes/browse/displayComposerPortrait.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer portrait in the VARS.SEARCH.composer
//                field if there is one; otherwise, hide the #portrait element.
//                Portraits are loaded from a url stored in the .POPC2_IMAGE parameter
//                of an entry in VARS.COMPOSER_INDEX.  The code checks data-composer
//                parameter of the #portrait element and will update the
//                portrait if needed.  A portrait will only be displayed if
//                a specific composer is selected in the browse select menu, and
//                portraits will also only be displayed if there is a URL for a
//                portrait.
//
//                Once the portrait image is downloaded, it will be stored in
//                VARS.PORTRAIT_IMAGES for faster loading of the image when the
//                browse page is redrawn (such as when changing languages).
//
{% endcomment %}

POPC2.prototype.DisplayComposerPortrait = function (composer, selector) {
	this.DebugMessageFunction(composer, selector);

	let composerDefaultImg = "<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS40LjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iY29tcG9zZXItZGVmYXVsdCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzJEMkU4Mjt9DQoJDQoJCS5zdDF7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAwMTk2NDU4Mzg4NTQ3OTk3NjQ0NzAwMDAwMDExNTU2MTEyMTM5NDI4OTUyNjdfKTtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjEuNTIzMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KPC9zdHlsZT4NCjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+DQo8Zz4NCgk8ZGVmcz4NCgkJPGNpcmNsZSBpZD0iU1ZHSURfMV8iIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIvPg0KCTwvZGVmcz4NCgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzAwMDAwMTQ4NjM0NzE3MDM2Mjc5OTUxMTYwMDAwMDA3Nzg5ODU4MzEzMzIxOTU1MjIxXyI+DQoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+DQoJPC9jbGlwUGF0aD4NCgkNCgkJPHBhdGggc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzAwMDAwMTQ4NjM0NzE3MDM2Mjc5OTUxMTYwMDAwMDA3Nzg5ODU4MzEzMzIxOTU1MjIxXyk7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoxLjUyMzI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgZD0iDQoJCU04MS41LDQ4LjVjLTIuNC0yLjctMy4zLTUuMi01LjMtNy40Yy0wLjMtMC4zLTAuMy0wLjctMC4zLTEuMWMwLTAuNSwwLTEsMC4zLTEuNGMwLjUtMC44LDAuMi0yLjQtMC44LTQuNmwxLjYtMC44DQoJCWMwLDAtMS41LTUuOC0yLjMtOC43Yy0wLjgtMi45LTQuNS00LjEtNC41LTQuMWMtMi43LTIuOS04LjQtNC45LTEyLjYtNS45Yy0yLjQtMC42LTUuMS0wLjgtNy43LTAuN2MwLDAsMCwwLDAsMFMzNC41LDEzLjMsMjkuNSwyMg0KCQljLTUuMSw4LjgtNC4zLDE2LjctNi40LDIxYy0yLDQuMy0zLjUsNi45LTQsOC4xYy0wLjYsMS4yLTMuNCw0LTMuMiw3LjdjMC4yLDMuMiwyLDMuOCwyLDMuOHMtMC40LDIuNSwwLjYsNA0KCQljMS4yLDEuOSwzLjUsMS44LDMuNSwxLjhzMC4yLDIuNSwxLjksMy40YzEuNiwwLjksMy43LDAuOCwzLjcsMC44czEuOSw0LjIsNS40LDIuOGMtMTEuNyw4LTE4LjMsMjEuOC0yMS42LDI3LjRoNTcuNw0KCQljLTAuNS02LjEtNi43LTIxLjUtNC43LTI2LjdjMC41LTEuMywwLjktMy4xLDEuNi0zLjhjMi41LTIuMSw0LjYtMi4xLDguNS0zLjhjMi4yLTAuNCw0LjItMS45LDIuMS01LjZjLTAuNS0wLjgtMC41LTEuMy0wLjQtMS45DQoJCWMwLTAuMiwwLjctMC42LDEuMy0xYzAuNy0wLjUsMC43LTEuMi0wLjQtMi4xYzAuOS0wLjEsMS40LTAuNywxLjEtMS45Yy0wLjYtMC40LTEuMS0yLjgsMC0zLjJjMS0wLjIsMS45LTAuOCwyLjYtMS4zDQoJCUM4MS45LDUwLjYsODIuMiw0OS4zLDgxLjUsNDguNXoiLz4NCjwvZz4NCjwvc3ZnPg0K'/>";

	let workid = this.VARS.WORK_ID;
	if (!composer) {
		if (workid) {
			let index = this.VARS.SCORE_INDEX;
			for (let i=0; i<index.length; i++) {
				if ((index[i].cenid == workid) || (index[i].fileid == workid)) {
					composer = index[i].COM;
					break;
				}
			}
		}
	}

	if ((!composer) && (!workid)) {
		// no work id, so no composer
		return;
	}

	if (!selector) {
		selector = "#composer-portrait";
	}

	let element = document.querySelector(selector);
	if (!element) {
		console.error("Cannot find element for selector", selector, "in DisplayComposerPortrait");
		return;
	}

	if (!composer) {
		element.style.display = "none";
		console.error("Composer is undefined in DisplayComposerPortrait()");
		// this is an error: If unknown, then should be composed by anonymous.
		return;
	}

	if (element.dataset.composer === composer) {
		// The composer is already displayed, so don't do anything,
		// except ensure that the portrait is visible:
		element.style.display = "block";
		console.warn(`Composer ${composer} is already being displayed.`)
		return;
	}

	let entry = this.VARS.COMPOSER_INDEX[composer];
	if (!entry) {
		element.style.display = "none";
		console.warn(`Cannot find info for ${composer}.`)
		// This is also strange, since all composers should be in the composer index.
		return;
	}

	if (this.VARS.PORTRAIT_IMAGES[composer]) {
		element.innerHTML = `<img src="${this.VARS.PORTRAIT_IMAGES[composer]}">`;
		return;
	}

	let url = "";
	let filename = entry.POPC2_IMAGE;
	if (filename) {
		url = `${this.SETTINGS.composer_images}/${filename}`;
		console.warn("URL for composer image is", url);
	} else {
		// This composer does not have a portrait, so display non-portrait.
		element.innerHTML = composerDefaultImg;
		element.dataset.composer = composer;
		return;
	}

	let that = this;
	if (url) {
		element.innerHTML = `<img src="${url}" title="Portrait of ${composer}">`;
		element.dataset.composer = composer;
		let imageElement = element.querySelector("img");
		if (imageElement) {
			imageElement.onload = function(event) {
				let encodedImage = that.GetBase64Image(event.currentTarget);
				that.VARS.PORTRAIT_IMAGES[composer] = encodedImage;
			}
		}
	} else {
		// Strange case: show composer non-image?
		element.innerHTML = composerDefaultImg;
		element.dataset.composer = composer;
	}

};

Object.defineProperty(POPC2.prototype.DisplayComposerPortrait, "name", { value: "DisplayComposerPortrait" });



