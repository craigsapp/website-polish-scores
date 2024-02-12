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
			iiif = matches[1].trim();;
		}
		break;
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

	if (iiif) {
		output += '<a target="_blank" ';
		// Mirador and Universal Viewer ignore the computer name
		// and instead search for a manifest parameter in the URL.
		output += 'id="iiif-link" ';
		output += `href="https://polishscores.org/?manifest=${encodeURIComponent(iiif)}" `;

		output += 'style="cursor:alias"';
		output += '>';

		output += '<img id="iiif-logo" ';
		output += 'class="trans" ';
		output += 'title="" ';
		output += 'data-transatt="title:iiif_info" ';
		output += 'style="cursor:alias" ';
		output += 'src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmlld0JveD0iMCAwIDQ5My4zNTk5OSA0NDEuMzMzMzQiCiAgIGhlaWdodD0iNDQxLjMzMzM0IgogICB3aWR0aD0iNDkzLjM1OTk5IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpZD0ic3ZnMiIKICAgdmVyc2lvbj0iMS4xIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE4Ij48cmRmOlJERj48Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcwogICAgIGlkPSJkZWZzNiIgLz48ZwogICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMzMzMywwLDAsLTEuMzMzMzMzMywwLDQ0MS4zMzMzMykiCiAgICAgaWQ9ImcxMCI+PGcKICAgICAgIHRyYW5zZm9ybT0ic2NhbGUoMC4xKSIKICAgICAgIGlkPSJnMTIiPjxwYXRoCiAgICAgICAgIGlkPSJwYXRoMTQiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMyODczYWI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmUiCiAgICAgICAgIGQ9Ik0gNjUuMjQyMiwyMTc4Ljc1IDc3NS4yNDIsMTkxNSA3NzMuOTkyLDE1IDY1LjI0MjIsMjc2LjI1IHYgMTkwMi41IiAvPjxwYXRoCiAgICAgICAgIGlkPSJwYXRoMTYiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMyODczYWI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmUiCiAgICAgICAgIGQ9Im0gODA0LjE0NSwyNjQwLjA5IGMgODEuNDQxLC0yNDAuOTEgLTI2LjQ3MywtNDM2LjIgLTI0MS4wNCwtNDM2LjIgLTIxNC41NTgsMCAtNDU0LjUxMSwxOTUuMjkgLTUzNS45NTI3LDQzNi4yIC04MS40MzM1LDI0MC44OSAyNi40ODA1LDQzNi4xOCAyNDEuMDM4Nyw0MzYuMTggMjE0LjU2NywwIDQ1NC41MTIsLTE5NS4yOSA1MzUuOTU0LC00MzYuMTgiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGgxOCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2VkMWQzMztmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0iTSAxNjc4LjU4LDIxNzguNzUgOTY4LjU3OCwxOTE1IDk2OS44MjgsMTUgMTY3OC41OCwyNzYuMjUgdiAxOTAyLjUiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGgyMCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2VkMWQzMztmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSA5MzUuMDgyLDI2NDAuMDkgYyAtODEuNDM3LC0yNDAuOTEgMjYuNDc3LC00MzYuMiAyNDEuMDM4LC00MzYuMiAyMTQuNTYsMCA0NTQuNTEsMTk1LjI5IDUzNS45Niw0MzYuMiA4MS40MywyNDAuODkgLTI2LjQ4LDQzNi4xOCAtMjQxLjA0LDQzNi4xOCAtMjE0LjU3LDAgLTQ1NC41MiwtMTk1LjI5IC01MzUuOTU4LC00MzYuMTgiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGgyMiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzI4NzNhYjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAxODYwLjI0LDIxNzguNzUgNzEwLC0yNjMuNzUgLTEuMjUsLTE5MDAgLTcwOC43NSwyNjEuMjUgdiAxOTAyLjUiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGgyNCIKICAgICAgICAgc3R5bGU9ImZpbGw6IzI4NzNhYjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAyNjAzLjc0LDI2NDAuMDkgYyA4MS40NSwtMjQwLjkxIC0yNi40NywtNDM2LjIgLTI0MS4wMywtNDM2LjIgLTIxNC41OCwwIC00NTQuNTIsMTk1LjI5IC01MzUuOTYsNDM2LjIgLTgxLjQ0LDI0MC44OSAyNi40OCw0MzYuMTggMjQxLjAzLDQzNi4xOCAyMTQuNTcsMCA0NTQuNTEsLTE5NS4yOSA1MzUuOTYsLTQzNi4xOCIgLz48cGF0aAogICAgICAgICBpZD0icGF0aDI2IgogICAgICAgICBzdHlsZT0iZmlsbDojZWQxZDMzO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lIgogICAgICAgICBkPSJtIDM3MDAuMjQsMzMxMCB2IC02NTIuNSBjIDAsMCAtMjMwLDkwIC0yNTcuNSwtMTQyLjUgLTIuNSwtMjQ3LjUgMCwtMzM2LjI1IDAsLTMzNi4yNSBsIDI1Ny41LDgzLjc1IFYgMTY5MCBsIC0yNTguNjEsLTkyLjUgViAyNjIuNSBMIDI3MzUuMjQsMCB2IDIzNjAgYyAwLDAgLTE1LDg1MCA5NjUsOTUwIiAvPjwvZz48L2c+PC9zdmc+Cg=="';
		output += '>';

		output += '</a>';
	}

	scanElement.innerHTML = output;

	if (iiif) {
		// Add event listners for displaying the manifest contents
		let iiifLink = scanElement.querySelector("#iiif-link");
		if (iiifLink) {
			iiifLink.addEventListener("click", function (event) {
				event.preventDefault();
				window.open(iiif, '_blank');
			})
		}
	}

	if (iiif) {
		// Probably not used (contextmenu event used to copy instead)
		let iiifLink = scanElement.querySelector("#iiif-link");
		iiifLink.addEventListener("copy", function (event) {
			event.preventDefault();
			event.clipboardData.setData('text/plain', iiif);
    });
}

	if (iiif) {
		// Add event listner for copying link address via
		// the context menu (context menu will not display, however).
		let iiifLink = scanElement.querySelector("#iiif-link");

		// Add event listener for right-click context menu
		// May not work in all browsers.  To copy the manifest
		// link right click on the link.
		iiifLink.addEventListener("contextmenu", function (event) {
			event.preventDefault();

			// Create a temporary textarea to hold the text to be copied
			var tempTextarea = document.createElement('textarea');
			tempTextarea.value = iiif;
			document.body.appendChild(tempTextarea);

			// Select the text in the textarea
			tempTextarea.select();

			// Add a copy event listener to the document
			document.addEventListener('copy', function (copyEvent) {
				copyEvent.preventDefault();

				// Manually set the clipboard data to the desired text
				copyEvent.clipboardData.setData('text/plain', iiif);

				document.body.removeChild(tempTextarea);
				alert("Copied manifest link: " + iiif);
			});

			// Trigger the copy command after a short delay
			setTimeout(() => {
				document.execCommand('copy');
				document.removeEventListener('copy', null);
			}, 0);
		});
	}

	this.ApplyElementTranslations(scanElement);

};

Object.defineProperty(POPC2.prototype.displayScanInfo, "name", { value: "displayScanInfo" });



