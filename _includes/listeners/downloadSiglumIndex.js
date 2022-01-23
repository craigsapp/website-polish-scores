{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Jan 22 15:10:36 PST 2022
// Last Modified: Sat Jan 22 15:10:39 PST 2022
// Filename:      _includes/listeners/downloadSiglumIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the siglum index and store its contents
//                into VARS.SIGLUM global variable.
//
{% endcomment %}

POPC2.prototype.downloadSiglumIndex = function () {
	this.DebugMessageFunction();
	let url = this.SETTINGS.siglum_index;
	this.DebugMessage("DOWNLOADING SIGLUM INDEX FROM " + url, "plum");
	let that = this;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			// convert data to associative array
			that.VARS.SIGLUM_INDEX = {};
			for (let i=0; i<data.length; i++) {
				let siglum = data[i].Siglum;
				if (!siglum) {
					continue;
				}
				if (siglum.match(/^\s*$/)) {
					continue;
				}
				that.VARS.SIGLUM_INDEX[siglum] = data[i];

				// Parameters in each entry:
				//    Siglum:      Siglum for library, case sensitive, such as "PL-Wn"
				//    Name-PL:     Name of the library in Polish
				//    Name-EN:     Name of the library in English
				//    Website-PL:  URL for the Polish-language homepage of library
				//    Website-EN:  URL for the English-language homepage of library
				//    NIFC-URL-PL: NIFC website for library in Polish
				//    NIFC-URL-EN: NIFC webiste for library
				// Borrow values into empty locations:
				if (!data[i]["Name-PL"]    ) { data[i]["Name-PL"] = "";     }
				if (!data[i]["Name-EN"]    ) { data[i]["Name-EN"] = "";     }
				if (!data[i]["Website-PL"] ) { data[i]["Website-PL"] = "";  }
				if (!data[i]["Website-EN"] ) { data[i]["Website-EN"] = "";  }
				if (!data[i]["NIFC-URL-PL"]) { data[i]["NIFC-URL-PL"] = ""; }
				if (!data[i]["NIFC-URL-EN"]) { data[i]["NIFC-URL-EN"] = ""; }

				if (data[i]["Name-EN"] === "") {
					data[i]["Name-EN"] = data[i]["Name-PL"];
				}
				if (data[i]["Name-PL"] === "") {
					data[i]["Name-PL"] = data[i]["Name-EN"];
				}

				if (data[i]["Website-EN"] === "") {
					data[i]["Website-EN"] = data[i]["Website-PL"];
				}
				if (data[i]["Website-PL"] === "") {
					data[i]["Website-PL"] = data[i]["Website-EN"];
				}

				if (data[i]["NIFC-URL-EN"] === "") {
					data[i]["NIFC-URL-EN"] = data[i]["NIFC-URL-PL"];
				}
				if (data[i]["NIFC-URL-PL"] === "") {
					data[i]["NIFC-URL-PL"] = data[i]["NIFC-URL-EN"];
				}

				if (data[i]["NIFC-URL-EN"] === "") {
					data[i]["NIFC-URL-EN"] = data[i]["Website-PL"];
				}
				if (data[i]["NIFC-URL-PL"] === "") {
					data[i]["NIFC-URL-PL"] = data[i]["Website-EN"];
				}

				if (data[i]["NIFC-URL-EN"] === "") {
					data[i]["NIFC-URL-EN"] = data[i]["NIFC-URL-PL"];
				}
				if (data[i]["NIFC-URL-PL"] === "") {
					data[i]["NIFC-URL-PL"] = data[i]["NIFC-URL-EN"];
				}

				// Store siglum name and URL in translation database
				if (this.VARS.TRANSLATIONS) {
					let tentry = {};
					tentry.TAG = `${siglum}_Name`;
					tentry.EN = data[i]["Name-EN"];
					tentry.PL = data[i]["Name-PL"];
					this.VARS.TRANSLATIONS[tentry.TAG] = tentry;

					let uentry = {};
					uentry.TAG = `${siglum}_URL`;
					uentry.EN = data[i]["NIFC-URL-EN"];
					uentry.PL = data[i]["NIFC-URL-PL"];
					this.VARS.TRANSLATIONS[uentry.TAG] = uentry;
				}
			}

			that.DebugMessage("DOWNLOADED SIGLUM INDEX FROM " + url, "purple");
		})
		.catch(err => { console.error("downloadSiglumIndex:", err); });
};

Object.defineProperty(POPC2.prototype.downloadSiglumIndex, "name", { value: "downloadSiglumIndex" });



