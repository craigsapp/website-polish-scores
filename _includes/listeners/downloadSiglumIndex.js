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
//                into VARS.SIGLUM_INDEX global variable.
//
{% endcomment %}

POPC2.prototype.downloadSiglumIndex = function () {
	this.DebugMessageFunction();
	let url = this.SETTINGS.siglum_index;
	this.DebugMessage("DOWNLOADING SIGLUM INDEX FROM " + url, "plum");
	let that = this;
	let now = new Date();
	let starttime = now.getTime();

	fetch(url)
		.then(response => response.json())
		.then(json => {
			let now = new Date();
			let endtime = now.getTime();
			let duration = (endtime - starttime) / 1000.0;
			// convert data to associative array
			that.VARS.SIGLUM_INDEX = {};
			for (let i=0; i<json.length; i++) {
				let siglum = json[i].Siglum;
				if (!siglum) {
					console.error("NO Siglum FIELD FOUND IN ENTRY", json[i]);
					continue;
				}
				if (siglum.match(/^\s*$/)) {
					continue;
				}
				that.VARS.SIGLUM_INDEX[siglum] = json[i];

				// Parameters in each entry:
				//    Siglum:      Siglum for library, case sensitive, such as "PL-Wn"
				//    Name-full-PL:  Full name of the library in Polish
				//    Name-short-PL: Short name of the library in Polish
				//    Name-full-EN:  Full name of the library in English
				//    Name-short-EN: Short name of the library in English
				//    Website-PL:    URL for the Polish-language homepage of library
				//    Website-EN:    URL for the English-language homepage of library
				//    NIFC-URL-PL:   NIFC website for library in Polish
				//    NIFC-URL-EN:   NIFC webiste for library
				// Borrow values into empty locations:
				if (!json[i]["Name-full-PL"] ) { json[i]["Name-full-PL"]  = ""; }
				if (!json[i]["Name-short-PL"]) { json[i]["Name-short-PL"] = ""; }
				if (!json[i]["Name-full-EN"] ) { json[i]["Name-full-EN"]  = ""; }
				if (!json[i]["Name-short-EN"]) { json[i]["Name-short-EN"] = ""; }
				if (!json[i]["Website-PL"]   ) { json[i]["Website-PL"]    = ""; }
				if (!json[i]["Website-EN"]   ) { json[i]["Website-EN"]    = ""; }
				if (!json[i]["NIFC-URL-PL"]  ) { json[i]["NIFC-URL-PL"]   = ""; }
				if (!json[i]["NIFC-URL-EN"]  ) { json[i]["NIFC-URL-EN"]   = ""; }

				// If no short name in language, borrow long name:
				if (json[i]["Name-short-EN"] === "") {
					json[i]["Name-short-EN"] = json[i]["Name-full-EN"];
				}
				if (json[i]["Name-short-PL"] === "") {
					json[i]["Name-short-PL"] = json[i]["Name-full-PL"];
				}

				// If no long name in language, borrow short name:
				if (json[i]["Name-long-EN"] === "") {
					json[i]["Name-long-EN"] = json[i]["Name-short-EN"];
				}
				if (json[i]["Name-long-PL"] === "") {
					json[i]["Name-long-PL"] = json[i]["Name-short-PL"];
				}

				// If no name in language, borrow other language's
				if (json[i]["Name-long-EN"] === "") {
					json[i]["Name-long-EN"] = json[i]["Name-long-PL"];
				}
				if (json[i]["Name-long-PL"] === "") {
					json[i]["Name-long-PL"] = json[i]["Name-long-EN"];
				}
				if (json[i]["Name-short-EN"] === "") {
					json[i]["Name-short-EN"] = json[i]["Name-short-PL"];
				}
				if (json[i]["Name-short-PL"] === "") {
					json[i]["Name-short-PL"] = json[i]["Name-short-EN"];
				}

				if (json[i]["Website-EN"] === "") {
					json[i]["Website-EN"] = json[i]["Website-PL"];
				}
				if (json[i]["Website-PL"] === "") {
					json[i]["Website-PL"] = json[i]["Website-EN"];
				}

				// Store siglum name and URL in translation database
				if (this.VARS.TRANSLATIONS) {
					let lentry = {};
					lentry.TAG = `${siglum}_Name_long`;
					lentry.EN = json[i]["Name-long-EN"];
					lentry.PL = json[i]["Name-long-PL"];
					this.VARS.TRANSLATIONS[lentry.TAG] = lentry;

					let sentry = {};
					sentry.TAG = `${siglum}_Name_short`;
					sentry.EN = json[i]["Name-short-EN"];
					sentry.PL = json[i]["Name-short-PL"];
					this.VARS.TRANSLATIONS[sentry.TAG] = sentry;

					let uentry = {};
					uentry.TAG = `${siglum}_URL`;
					uentry.EN = json[i]["Website-EN"];
					uentry.PL = json[i]["Website-PL"];
					this.VARS.TRANSLATIONS[uentry.TAG] = uentry;
				}
			}

			that.buildSiglumFilter();
			that.DebugMessage(`DOWNLOADED SIGLUM INDEX FROM ${url} in ${duration} seconds`, "plum");
		})
		.catch(err => {
			console.error("downloadSiglumIndex:", err);
			this.downloadSiglumIndex();
		});
};

Object.defineProperty(POPC2.prototype.downloadSiglumIndex, "name", { value: "downloadSiglumIndex" });



