{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon May 30 08:44:04 PDT 2022
// Last Modified: Tue Aug  9 11:11:54 CEST 2022
// Filename:      _includes/browse/displayLibraryPortrait.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the library portrait for the source of a work.
//                Library icons are stored in /img/siglum and named by
//                the RISM siglum of the library/archive.
//
//
{% endcomment %}

POPC2.prototype.DisplayLibraryPortrait = function (siglum, selector) {
	this.DebugMessageFunction(siglum, selector);

	let libraryDefaultSvg = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS40LjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0idW5rbm93biIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzJEMkU4Mjt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+DQo8Zz4NCgk8cGF0aCBzdHJva2U9IndoaXRlIiBmaWxsPSJub25lIiBkPSJNMjUsODIgaDUwIHYtNDAgbC0yNSwtMzAgbC0yNSwzMCB6IiAvPg0KPC9nPg0KPC9zdmc+DQo=";

	let workid = this.VARS.WORK_ID;
	if (!siglum) {
		if (workid) {
			let index = this.VARS.SCORE_INDEX;
			for (let i=0; i<index.length; i++) {
				if ((index[i].cenid == workid) || (index[i].fileid == workid)) {
					siglum = index[i].siglum || "";
					siglum = siglum.toLowerCase();
					break;
				}
			}
		}
	}

	if ((!siglum) && (!workid)) {
		// no work id, so no library
		return;
	}

	if (!selector) {
		selector = "#library-portrait";
	}

	let element = document.querySelector(selector);
	if (!element) {
		console.error("Cannot find element for selector", selector, "in DisplayLibraryPortrait");
		return;
	}

	if (!siglum) {
		element.style.display = "none";
		console.error("Library is undefined in DisplayLibraryPortrait()");
		// this is an error: If unknown, then should be an unknown library.
		return;
	}

	if (element.dataset.siglum === siglum) {
		// The siglum is already displayed, so don't do anything,
		// except ensure that the portrait is visible:
		element.style.display = "block";
		console.warn(`Library ${siglum} is already being displayed.`)
		return;
	}

	if (this.VARS.PORTRAIT_IMAGES[siglum]) {
		let svg = atob(this.VARS.PORTRAIT_IMAGES[siglum]);
		element.innerHTML = svg;
		element.dataset.siglum === siglum;
		return;
	}

	let url = `${this.SETTINGS.library_images}/${siglum}.svg`;

	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.text();
			} else {
				let svg = atob(libraryDefaultSvg);
				this.VARS.PORTRAIT_IMAGES[siglum] = libraryDefaultSvg;
				element.dataset.siglum = siglum;
				element.innerHTML = svg;
			}
		})
		.then(text => {
			let encoded = btoa(text);
			this.VARS.PORTRAIT_IMAGES[siglum] = encoded;
			element.dataset.siglum === siglum;
			element.innerHTML = text;
			element.style.display = "block";
		});

};

Object.defineProperty(POPC2.prototype.DisplayLibraryPortrait, "name", { value: "DisplayLibraryPortrait" });



