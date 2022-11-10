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
		// .then(res => res.json())
		.then(function(res) {
			console.log("=============================== SIGLA INDEX RESPONSE", res);
			return res.json();
		})
		.then(data => {
			let now = new Date();
			let endtime = now.getTime();
			let duration = (endtime - starttime) / 1000.0;
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
				//    Name-full-PL:  Full name of the library in Polish
				//    Name-short-PL: Short name of the library in Polish
				//    Name-full-EN:  Full name of the library in English
				//    Name-short-EN: Short name of the library in English
				//    Website-PL:    URL for the Polish-language homepage of library
				//    Website-EN:    URL for the English-language homepage of library
				//    NIFC-URL-PL:   NIFC website for library in Polish
				//    NIFC-URL-EN:   NIFC webiste for library
				// Borrow values into empty locations:
				if (!data[i]["Name-full-PL"] ) { data[i]["Name-full-PL"]  = ""; }
				if (!data[i]["Name-short-PL"]) { data[i]["Name-short-PL"] = ""; }
				if (!data[i]["Name-full-EN"] ) { data[i]["Name-full-EN"]  = ""; }
				if (!data[i]["Name-short-EN"]) { data[i]["Name-short-EN"] = ""; }
				if (!data[i]["Website-PL"]   ) { data[i]["Website-PL"]    = ""; }
				if (!data[i]["Website-EN"]   ) { data[i]["Website-EN"]    = ""; }
				if (!data[i]["NIFC-URL-PL"]  ) { data[i]["NIFC-URL-PL"]   = ""; }
				if (!data[i]["NIFC-URL-EN"]  ) { data[i]["NIFC-URL-EN"]   = ""; }

				// If no short name in language, borrow long name:
				if (data[i]["Name-short-EN"] === "") {
					data[i]["Name-short-EN"] = data[i]["Name-full-EN"];
				}
				if (data[i]["Name-short-PL"] === "") {
					data[i]["Name-short-PL"] = data[i]["Name-full-PL"];
				}

				// If no long name in language, borrow short name:
				if (data[i]["Name-long-EN"] === "") {
					data[i]["Name-long-EN"] = data[i]["Name-short-EN"];
				}
				if (data[i]["Name-long-PL"] === "") {
					data[i]["Name-long-PL"] = data[i]["Name-short-PL"];
				}

				// If no name in language, borrow other language's
				if (data[i]["Name-long-EN"] === "") {
					data[i]["Name-long-EN"] = data[i]["Name-long-PL"];
				}
				if (data[i]["Name-long-PL"] === "") {
					data[i]["Name-long-PL"] = data[i]["Name-long-EN"];
				}
				if (data[i]["Name-short-EN"] === "") {
					data[i]["Name-short-EN"] = data[i]["Name-short-PL"];
				}
				if (data[i]["Name-short-PL"] === "") {
					data[i]["Name-short-PL"] = data[i]["Name-short-EN"];
				}

				if (data[i]["Website-EN"] === "") {
					data[i]["Website-EN"] = data[i]["Website-PL"];
				}
				if (data[i]["Website-PL"] === "") {
					data[i]["Website-PL"] = data[i]["Website-EN"];
				}

				// Store siglum name and URL in translation database
				if (this.VARS.TRANSLATIONS) {
					let lentry = {};
					lentry.TAG = `${siglum}_Name_long`;
					lentry.EN = data[i]["Name-long-EN"];
					lentry.PL = data[i]["Name-long-PL"];
					this.VARS.TRANSLATIONS[lentry.TAG] = lentry;

					let sentry = {};
					sentry.TAG = `${siglum}_Name_short`;
					sentry.EN = data[i]["Name-short-EN"];
					sentry.PL = data[i]["Name-short-PL"];
					this.VARS.TRANSLATIONS[sentry.TAG] = sentry;

					let uentry = {};
					uentry.TAG = `${siglum}_URL`;
					uentry.EN = data[i]["Website-EN"];
					uentry.PL = data[i]["Website-PL"];
					this.VARS.TRANSLATIONS[uentry.TAG] = uentry;
				}
			}

			that.buildSiglumFilter();
			that.DebugMessage(`DOWNLOADED SIGLUM INDEX FROM ${url} in ${duration} seconds`, "plum");
		})
		.catch(err => { console.error("downloadSiglumIndex:", err); });
};

Object.defineProperty(POPC2.prototype.downloadSiglumIndex, "name", { value: "downloadSiglumIndex" });



