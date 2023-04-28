{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Dec 10 12:46:45 CET 2021
// Last Modified: Fri Dec 10 12:46:48 CET 2021
// Filename:      _includes/iiif/getIiifManifestInfo.js
// Used by:

// Included in:   _includes/iiif/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download IIIF Manifest and extract the page
//                image list along with labels for each image.
//
{% endcomment %}

POPC2.prototype.getIiifManifestInfo = function (info, event, callback) {
	this.DebugMessageFunction();

	let humdrum = info.humdrum;
	if (!humdrum) {
		console.error("NO HUMDRUM DATA IN", info);
		return;
	}
	if (!info.label) {
		console.error("NO IMAGE LABEL IN", info);
		return;
	}

	// The manifest has has been previously cached, so use that cached version:

	if (this.VARS.IIIF_MANIFEST.hasOwnProperty(this.VARS.WORK_ID)) {
		info.manifest = this.VARS.IIIF_MANIFEST[this.VARS.WORK_ID];
		info.iiifbase = "";
		let imi = info.manifest.images;

		// 0-indexed image number:
		let matches = info.label.match(/^#z(\d+)/);
		if (matches) {
			info.iiifbase = imi[parseInt(matches[1])].iiifbase;
			callback(event, info);
			return;
		}

		// 1-indexed image number:
		matches = info.label.match(/^#(\d+)/);
		if (matches) {
			info.iiifbase = imi[parseInt(matches[1]) - 1].iiifbase;
			callback(event, info);
			return;
		}

		// Textual label:
		for (let i=0; i<imi.length; i++) {
			if (imi[i].label === info.label) {
				info.iiifbase = imi[i].iiifbase;
				break;
			}
		}
		callback(event, info);
		return;
	}


	// The manifest has not yet been downloaded, so do so:

	//let skey = `^!!!IIIF:\\s*([^\\s]+manifest.json)`;
	let skey = `^!!!IIIF:\\s*([^\\s]+)`;
	let regex = new RegExp(skey);
	for (let i=0; i<humdrum.length; i++) {
		let matches = humdrum[i].match(regex);
		if (matches) {
			// First search to see if Manifest is aleady cached:
			let manifest = matches[1];
			let mvalue = null;
			for (const property in this.VARS.IIIF_MANIFEST) {
				if (this.VARS.IIIF_MANIFEST[property].manifest === manifest) {
					mvalue = this.VARS.IIIF_MANIFEST[property]
					break;
				}
			}
			if (mvalue) {
				// Found Manifest cache, so don't try to download again.
				this.VARS.IIIF_MANIFEST[this.VARS.WORK_ID] = mvalue;
				info.manifest = mvalue;
				callback(event, info);
				return;
			}

			// Manifest needs to be downloaded and processed:
			fetch(manifest)
				.then(results => results.json())
				.then(data => {
					console.log("DOWNLOADED MANIFEST:", data);
					let items = null;
					if (data.items) {
						 // Polona manifests:
						items = data.items;
					} else if (data.sequences && data.sequences[0] && data.sequences[0].canvases && data.sequences[0].canvases) {
						// NIFC manifests:
						items = data.sequences[0].canvases;
					} else {
						console.error("Cannot find image info in manifest");
						return;
					}
					if (!items) {
						console.error("Cannot find image info in manifest (2)");
						return;
					}

					let maninfo = {};
					maninfo.images = [];
					maninfo.manifest = manifest;
					for (let j=0; j<items.length; j++) {
						let entry = {};
						let id;
						// let mantype = "";
						if (items[j].id) {
							// Polona style
							id = items[j].id;
							// mantype = "polona" // IIIF manifest v. 3
						} else if (items[j]["@id"]) {
							// NIFC style
							id = items[j].images[0].resource.service["@id"]
							// mantype = "nifc" // IIIF manifest v. 2
						} else {
							console.error("Cannot find ID in", items[j]);
							return;
						}
						entry.iiifbase = id.replace(/\/?info\.json$/, "");
						let lobj = items[j].label;
						let keys = Object.keys(lobj);
						let label = "";
						if (keys.length > 0) {
							label = lobj[keys[0]][0];
						}
						entry.label = label;
						if (label === info.label) {
							info.iiifbase = entry.iiifbase;
						}
						maninfo.images.push(entry);
					}

					info.manifest = maninfo;

					if (!info.iiifbase) {
						// 0-indexed image number:
						let matches = info.label.match(/^#z(\d+)/);
						if (matches) {
							info.iiifbase = info.manifest.images[parseInt(matches[1])].iiifbase;
						}

						// 1-indexed image number:
						matches = info.label.match(/^#(\d+)/);
						if (matches) {
							info.iiifbase = info.manifest.images[parseInt(matches[1]) - 1].iiifbase;
						}
					}

					this.VARS.IIIF_MANIFEST[this.VARS.WORK_ID] = maninfo;
					this.VARS.IIIF_MANIFEST[manifest] = maninfo;
					callback(event, info);
				})
				.catch(error => { console.error(error); });
			break;
		}
	}
};

Object.defineProperty(POPC2.prototype.getIiifManifestInfo, "name", { value: "getIiifManifestInfo" });



