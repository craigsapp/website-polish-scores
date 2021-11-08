{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 22:22:19 PDT 2021
// Last Modified: Sat Oct 30 22:22:22 PDT 2021
// Filename:      _includes/handlebars/helper-showTitle.js
// Used by:
// Included in:   _includes/handlebars/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the page title (on the browse page).  This is
//                usually the website title, but could be "Bookmarks" or
//                "History" view.
//
{% endcomment %}

Handlebars.registerHelper("showTitle", function() {
	let belement = document.querySelector("#bookmark-browse-button");
	let bookmarks = false;
	if (belement && belement.classList.contains("selected")) {
		bookmarks = true;
	}

	if (bookmarks) {
		return new Handlebars.SafeString(popc2.getTranslation("bookmarks"));
	}

	return new Handlebars.SafeString(popc2.getTranslation("title"));
});



