{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Jan 23 20:17:32 PST 2022
// Last Modified: Tue May 31 00:17:34 PDT 2022
// Filename:      _includes/work/displayWorkInfo.js
// Used by:       _includes/work/displayScore.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display any scan links embedded in the score.  A future enhancement
//                would be to check if the same score has already been processed for
//                scan links in score.
//
{% endcomment %}

POPC2.prototype.displayScanInfo = function(humdrum) {
	this.DebugMessageFunction();
	if (!humdrum) {
		humdrum = this.getHumdrumFromPage();
	}

	let scanBase64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzNSIgaGVpZ2h0PSIzNSIgaWQ9InNjYW4taWNvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDM4NCA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4NCA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZD0iTTYyLjUsNTAxLjdjLTI5LjgsMC01NC0yNC4yLTU0LTU0bDAtMzg0YzAtMjkuOCwyNC4yLTU0LDU0LTU0aDE4MS40YzE0LjIsMCwyOC4xLDUuOCwzOC4yLDE1LjhsNzQuNiw3NC42CgljMTAsMTAsMTUuOCwyMy45LDE1LjgsMzguMXYzMDkuNGMwLDI5LjgtMjQuMiw1NC01NCw1NEg2Mi41eiBNNjIuNSwzNy44Yy0xNC4zLDAtMjYsMTEuNy0yNiwyNmwwLDM4My45YzAsMTQuMywxMS43LDI2LDI2LDI2aDI1NgoJYzE0LjMsMCwyNi0xMS43LDI2LTI2di0yOThoLTkwYy0xMi4xLDAtMjItOS45LTIyLTIyVjM3LjhINjIuNXoiLz4KPGc+Cgk8cGF0aCBkPSJNMTQxLjIsMjIyLjdjLTMuNy02LjktMTEtMTEuNS0xOS4zLTExLjVzLTE1LjYsNC43LTE5LjMsMTEuNWgtMzJ2MjAuOGgzMmMzLjcsNi45LDExLDExLjUsMTkuMywxMS41CgkJczE1LjYtNC43LDE5LjMtMTEuNWgxNjguM3YtMjAuOEgxNDEuMnoiLz4KCTxyZWN0IHg9IjcwLjUiIHk9IjM0Ny40IiB3aWR0aD0iMjM5IiBoZWlnaHQ9IjIwLjgiLz4KCTxwYXRoIGQ9Ik0xNjcuNSwyOTQuM2MtOC40LDAtMTUuNiw0LjctMTkuMywxMS41SDcwLjV2MjAuOGg3Ny43YzMuNyw2LjksMTEsMTEuNSwxOS4zLDExLjVjOC40LDAsMTUuNi00LjcsMTkuMy0xMS41CgkJaDEyMi43di0yMC44SDE4Ni44QzE4My4xLDI5OSwxNzUuOCwyOTQuMywxNjcuNSwyOTQuM3oiLz4KCTxwYXRoIGQ9Ik0yMjAuNiwyNTIuOGMtOC40LDAtMTUuNiw0LjctMTkuMywxMS41SDcwLjV2MjAuOGgxMzAuOGMzLjcsNi45LDExLDExLjUsMTkuMywxMS41czE1LjYtNC43LDE5LjMtMTEuNWg2OS42CgkJdi0yMC44aC02OS42QzIzNi4yLDI1Ny40LDIyOC45LDI1Mi44LDIyMC42LDI1Mi44eiIvPgoJPHBhdGggZD0iTTI2NC41LDM3Ny40Yy04LjQsMC0xNS42LDQuNy0xOS4zLDExLjVINzAuNXYyMC44aDE3NC42YzMuNyw2LjksMTEsMTEuNSwxOS4zLDExLjVzMTUuNi00LjcsMTkuMy0xMS41aDI1LjcKCQlWMzg5aC0yNS43QzI4MC4xLDM4Mi4xLDI3Mi44LDM3Ny40LDI2NC41LDM3Ny40eiIvPgo8L2c+Cjwvc3ZnPgo=";

	let scanElement = document.querySelector("#work-scans");
	if (!scanElement) {
		return;
	}
	if (!humdrum) {
		scanElement.innerHTML = "";
	}

	// Search for the first "!!!IIIF:" line:
	let humdrumLines = humdrum.split(/\r?\n/);
	let iiif = "";
	for (let i=0; i<humdrumLines.length; i++) {
		let matches = humdrumLines[i].match("^!!!IIIF:");
		if (!matches) {
			continue;
		}
		matches = humdrumLines[i].match("^!!!IIIF:\s*(.*)\s*$");
		if (matches) {
			iiif = matches[1];
		}
		break;
	}
	if (iiif) {
		this.ShowIiifLogo();
	} else {
		this.HideIiifLogo();
	}

	let lines = humdrum.split(/\r?\n/);
	let links = [];
	for (let i=0; i<lines.length; i++) {
		matches = lines[i].match(/^!!!URL-scan[^:]*\s*:\s*([^\s]+)\s*(.*)\s*$/);
		if (!matches) {
			continue;
		}
		let entry = {};
		entry.url = matches[1];
		entry.title = matches[2];
		links.push(entry);
	}

	if (links.length == 0) {
		scanElement.innerHTML = "";
		return;
	}

	// create scan contents from links
	let output = "";
	let scanSvg = atob(scanBase64);
	// also should adjust SVG ID when links more than 1.
	for (let i=0; i<links.length; i++) {
		if (links[i].title) {
			output += `<a target="scan" class="trans image-scan" data-transatt="title:${links[i].title}" href="${links[i].url}">${scanSvg}</span></a> `;
		} else {
			output += `<a target="scan" class="image-scan" href="${links[i].url}">${scanSvg}</span></a> `;
		}
	}

	scanElement.innerHTML = output;

	this.ApplyElementTranslations(scanElement);

};

Object.defineProperty(POPC2.prototype.displayScanInfo, "name", { value: "displayScanInfo" });



