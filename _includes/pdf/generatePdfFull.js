{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 19:53:49 PDT 2021
// Last Modified: Sat Oct 30 19:53:52 PDT 2021
// Filename:      _includes/browse/generatePdfFull.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Write a multi-page PDF of the full score on the work page.
//
{% endcomment %}

POPC2.prototype.generatePdfFull = function (format, orientation) {
	var oldOptions = vrvWorker.options;
	// need to explicitly disable mmOutput = 1 set by the printing process.
	oldOptions.mmOutput = 0;

	document.body.classList.add("waiting");

	var format = format ? format : "letter";
	var orientation = orientation ? orientation : "portrait";

	//var width = 2159;
	//var height = 2794;
	//var height = 2920;

	//if (format === "A4") {
		var width = 2100;
		var height = 2970;
	//} else if (format === "B3") {
	//	width = 2500;
	//	height = 3530;
	//}
	if (orientation === "landscape") {
		width = [height, height = width][0];
	}

	var pdfOptions = {};
	pdfOptions.fontCallback = this.svgFontCallback;

	var pdf = new PDFDocument({
		useCSS:        true,
		compress:      true,
		autoFirstPage: false,
		layout:        orientation
	});
	var stream = pdf.pipe(blobStream());
	stream.on('finish', function() {
		var blob = stream.toBlob('application/pdf');
		var pdfFilebase = "DATA";
		var pdfFilename = pdfFilebase;
		if (pdfFilename) {
			pdfFilename += ".pdf";
		} else {
			pdfFilename = "data.pdf";
		}
		saveAs(blob, pdfFilename);
		document.body.classList.remove("waiting");
	});

	var scale = 95;
	height /= scale / 100;
	width  /= scale / 100;

	// var spacingBraceGroup   = 12;
	// var spacingBracketGroup = 12;
	var spacingStaff        = 10;
	var spacingSystem       = 14;
	var pageMarginTop       = 100;
	var pageMarginBottom    = 100;
	var pageMarginLeft      = 50;
	var pageMarginRight     = 50;

	var vrvOptions = {
		pageHeight             : height - pageMarginTop,
		pageWidth              : width,
		pageMarginLeft         : pageMarginLeft,
		pageMarginRight        : pageMarginRight,
		pageMarginTop          : pageMarginTop,
		pageMarginBottom       : pageMarginBottom,
		spacingSystem          : spacingSystem,
		spacingStaff           : spacingStaff,
		scale                  : scale,
		adjustPageHeight       : 0,
		justifyVertically      : 1,
		// breaks                 : (BREAKS ? "encoded" : "auto"),
		breaks                 : "auto",
		mmOutput               : 1,
		// justifyIncludeLastPage : 1, // no longer a verovio option?
		// justifySystemOnly   : 1, // no longer a verovio option?
		// justifySystemsOnly  : 1, // no longer a verovio option?
		header                 : "auto",
		footer                 : "encoded",
		usePgFooterForAll      : 1,
		barLineWidth           : 0.12,
		staffLineWidth         : 0.12,
		font                   : "Leland",
	}

	var scoredata = this.VARS.HUMDRUM[this.VARS.WORK_ID];
	scoredata += "\n!!!filter: shed -e s/t=P://L | shed -e s/:problem/:PROBLEM/L\n";
	// scoredata += "!!!header-center: " + HUMDRUMFILETITLE + "\n";
	scoredata += "!!!header-left: \n";
	//scoredata += "!!!header-left: @{PPR}, @{PPP}\n";

	console.log("humdrum data for PDF:", scoredata);
	//var staffcount = getStaffCount(scoredata);
	//if (staffcount == 2) {
	//	//vrvOptions.justifySystemsOnly = 1;
	//	//vrvOptions.justifyIncludeLastPage = 1;
	//}

	//if (GLOBALFILTER) {
	//	scoredata += "\n!!!filter: " + GLOBALFILTER + "\n";
	//}

	vrvOptions = this.cleanOptions2(scoredata, vrvOptions);
	console.log("PRINTING OPTIONS", vrvOptions);

	// store the options for debugging PDF files:
	// PDFOPTIONS = vrvOptions;

	let that = this;
	RSVP.hash({
		fonts: this.loadPdfFonts(pdf),
		svglist: vrvWorker.renderAllPages(scoredata, vrvOptions)
	})
	.then(function(data) {
		for (var i=0; i < data.svglist.length; i++) {
			pdf.addPage({size: format, layout: orientation});
			var x = 0;
			var y = 0;
			SVGtoPDF(pdf, data.svglist[i], x, y, pdfOptions);
		}
		pdf.end();
		return true;
	})
	.finally(function() {
		// restore the old layout for the VHV  webpage:
		var force = false;
		var page = vrvWorker.page;
		var cleanoldoptions = that.cleanOptions2(scoredata, oldOptions);
		vrvWorker.redoLayout(oldOptions, true);
		vrvWorker.options = oldOptions;
	});
}

Object.defineProperty(POPC2.prototype.cleanOptions2, "name", { value: "cleanOptions2" });



