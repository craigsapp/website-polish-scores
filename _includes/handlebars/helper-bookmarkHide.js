{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 22:36:48 PDT 2021
// Last Modified: Sat Oct 30 22:36:51 PDT 2021
// Filename:      _includes/handlebars/helper-bookmarkHide.js
// Used by:
// Included in:   _includes/handlebars/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Hide something (filter menu) if bookmarks are active.
//
{% endcomment %}

Handlebars.registerHelper("bookmarkHide", function() {
	let belement = document.querySelector("#bookmark-browse-button");
	let bookmarks = false;
	if (belement && belement.classList.contains("selected")) {
		bookmarks = true;
	}

	if (bookmarks) {
		return new Handlebars.SafeString("hidden");
	}

	return new Handlebars.SafeString("");
});



