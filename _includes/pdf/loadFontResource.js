{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 19:58:09 PDT 2021
// Last Modified: Sat Oct 30 19:58:12 PDT 2021
// Filename:      _includes/browse/loadFontResource.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Use font from file in PDF, returns promise.
//
{% endcomment %}

POPC2.prototype.loadFontResource = function (pdf, name, path) {
	var promise = new RSVP.Promise(function(resolve, reject) {

		var client = new XMLHttpRequest();
		client.open("GET", path);
		client.responseType = "arraybuffer";

		client.onreadystatechange = function() {
			if (this.readyState === this.DONE) {
				if (this.status === 200) {
					resolve(this.response);
				} else {
					reject(this);
				};
			}
		};

		client.send(null);
	});

	return promise.then(function(data) {
		pdf.registerFont(name, data);
		return true;
	});
}

Object.defineProperty(POPC2.prototype.loadFontResource, "name", { value: "loadFontResource" });



