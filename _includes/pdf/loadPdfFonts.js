{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 20:03:39 PDT 2021
// Last Modified: Sat Oct 30 20:03:42 PDT 2021
// Filename:      _includes/browse/loadPdfFonts.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   load all of the default fonts needed for Verovio notation.
//
{% endcomment %}

POPC2.prototype.loadPdfFonts = function (pdf) {
	return RSVP.all([
		this.loadFontResource(pdf, "Times",           "{{ site.website_root }}scripts/pdfkit/EBGaramond-Regular.ttf"),
		this.loadFontResource(pdf, "TimesItalic",     "{{ site.website_root }}scripts/pdfkit/EBGaramond-Italic.ttf"),
		this.loadFontResource(pdf, "TimesBold",       "{{ site.website_root }}scripts/pdfkit/EBGaramond-Bold.ttf"),
		this.loadFontResource(pdf, "TimesBoldItalic", "{{ site.website_root }}scripts/pdfkit/EBGaramond-BoldItalic.ttf"),
		this.loadFontResource(pdf, "VerovioText",     "{{ site.website_root }}scripts/pdfkit/VerovioText-1.0.ttf"),
	]);
}

Object.defineProperty(POPC2.prototype.loadPdfFonts, "name", { value: "loadPdfFonts" });



