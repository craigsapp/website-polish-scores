{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 07:35:37 PDT 2021
// Last Modified: Sat Jan 22 20:04:19 PST 2022
// Filename:      _includes/work/displayWorkInfo.js
// Used by:       _includes/work/displayScore.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer and title above a score.
//                Change this to get the composer/title info
//                from the Humdrum file rather than the score index.
//
{% endcomment %}

POPC2.prototype.displayWorkInfo = function(id) {
	this.DebugMessageFunction();
	let targetid = id;
	if (!targetid) {
		targetid = this.VARS.WORK_ID;
	}
	if (!targetid) {
		console.error("NO ACTIVE WORK ID");
		return;
	}
	let index = this.VARS.SCORE_INDEX;
	let entry;
	for (let i=0; i<index.length; i++) {
		if ((typeof index[i].cenid !== "undefined") && (index[i].cenid === targetid)) {
			entry = index[i];
			break;
		}
		if ((typeof index[i].fileid !== "undefined") && (index[i].fileid === targetid)) {
			entry = index[i];
			break;
		}
		if ((typeof index[i].nifcid !== "undefined") && (index[i].nifcid === targetid)) {
			entry = index[i];
			break;
		}
	}
	if (!entry) {
		// suppressing the message about a missing score, since POPC1 files
		// will have missing metadata in the POPC2 website, but it is still
		// interesting to be able to display them.
		// this.setWorkPageErrorMessage("Did not find score for ID: " + targetid);
		return;
	}
	this.setBookmarkState(entry.fileid);
	let base = document.querySelector("#work-header");
	if (!base) {
		console.error("Error: cannot find #work-header");
	}

	// Show composer name/info
	let composerNameElement = base.querySelector("#composer-name");
	if (composerNameElement && entry.COM) {
		let text = this.FlipName(entry.COM);
		if (!entry.COM.match(/^anon/i)) {
			composerNameElement.style.cursor = "pointer";
			text += "&nbsp;<i class='composer-info fas fa-info-circle'></i>";
		} else {
			composerNameElement.style.cursor = "auto";
		}
		composerNameElement.innerHTML = text;
		composerNameElement.dataset.name = entry.COM;
	}
	this.fillInComposerInfo(entry.COM);

	// Show work/movement title:
	let titleElement = base.querySelector("#title-area");
	let gElement = base.querySelector("#GROUPTITLE");
	let tElement = base.querySelector("#TITLE");
	let sElement = base.querySelector("#SUBTITLE");

	let gtl = entry.GTL || "";
	let opr = entry.OPR || "";
	let otl = entry.OTL || "";

	let subtitle   = "";
	let title      = "";
	let grouptitle = "";

	if (gtl) {
		grouptitle = gtl;
		subtitle = otl;
	} else if (opr) {
		title = opr;
		subtitle = otl;
	} else {
		title = otl;
	}

	if (titleElement) {
		if (grouptitle) {
			gElement.innerHTML = grouptitle;
			gElement.classList.remove("hidden");
			titleElement.classList.remove("hidden");
		} else {
			gElement.classList.add("hidden");
		}

		if (tElement) {
			if (title) {
				tElement.innerHTML = title;
				tElement.classList.remove("hidden");
				titleElement.classList.remove("hidden");
			} else {
				tElement.classList.add("hidden");
			}
		}

		if (sElement) {
			if (subtitle) {
				sElement.innerHTML = subtitle;
				sElement.classList.remove("hidden");
				titleElement.classList.remove("hidden");
			} else {
				sElement.classList.add("hidden");
			}
		}

	}

	// Show source library name:
	let libraryElement = document.querySelector("#library-name");
	if (libraryElement && this.VARS.SIGLUM_INDEX[entry.siglum]) {
		let siglum = entry.siglum;
		libraryElement.innerHTML = "";
		let tag = `${siglum}_URL`;
		let hasUrl = false;
		let translation = this.VARS.TRANSLATIONS[tag];
		if (translation) {
			if (translation.PL) {
				hasUrl = true;
			} else if (translation.EN) {
				hasUrl = true;
			}
		}
		let output = `<a target="_blank" class="trans" href="" data-trans="${siglum}_Name" data-transatt="href:${siglum}_URL"></a>`;
		if (!hasUrl) {
			output = `<span class="trans" data-trans="${siglum}_Name"></span>`;
		}
		libraryElement.innerHTML = output;
	}

	// Show siglum and shelfmark:
	let shelfmarkElement = document.querySelector("#shelfmark");
	if (shelfmarkElement && this.VARS.SIGLUM_INDEX[entry.siglum]) {
		let siglum = entry.siglum;
		let shelfmark = entry.shelfmark;
		shelfmarkElement.innerHTML = "";
		let output = `${siglum} ${shelfmark}`;
		shelfmarkElement.innerHTML = output;
	}


	// Needed for some composer dates and shelfmark:
	this.ApplyElementTranslations();

};

Object.defineProperty(POPC2.prototype.displayWorkInfo, "name", { value: "displayWorkInfo" });



