{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 19:54:47 PDT 2021
// Last Modified: Sat Oct 30 19:54:50 PDT 2021
// Filename:      _includes/browse/generatePdfSnapshot.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Write a PDF file containing the currently displayed SVG.
//
{% endcomment %}

POPC2.prototype.generatePdfSnapshot = function (format, orientation) {
	document.body.classList.add("waiting");
	var svg = document.querySelector("#humdrum-svg svg");
	var svgwidth = svg.getAttribute("width");
	var svgheight = svg.getAttribute("height");
	svgwidth = parseInt(svgwidth);
	svgheight = parseInt(svgheight);
	var aspect = svgheight / svgwidth;

	var format = format ? format : "letter";

	//var pagewidth = 2159;
	//var pageheight = 2794;
	//if (format === "A4") {
		var pagewidth = 2100;
		var pageheight = 2970;
	//} else if (format === "B3") {
	//	pagewidth = 2500;
	//	pageheight = 3530;
	//}

	if (!orientation) {
		if (svgwidth > svgheight) {
			orientation = "landscape";
		}
	}
	var orientation = orientation ? orientation : "portrait";
	if (orientation === "landscape") {
		pagewidth = [pageheight, pageheight = pagewidth][0];
	}

	var pageaspect = pageheight / pagewidth;
	var scaling = 0.90;
	var mmwidth;
	var mmheight;

	if (aspect < pageaspect) {
		mmwidth = (pagewidth / 10) * scaling;
		mmheight = (pagewidth / 10) * aspect * scaling;
	} else {
		mmheight = (pageheight / 10) * scaling;
		mmwidth = (pageheight / 10) / aspect * scaling;
	}

	var pagewidthmm = pagewidth / 10.0;
	var pageheightmm = pageheight / 10.0;

	// pdf page offset (units are in mm?)
	var x = 0;
	var y = 0;

	if (mmwidth < pagewidthmm) {
		x = (pagewidthmm - mmwidth);
	}
	x += 1;

	var newspan = document.createElement("span");
	newspan.innerHTML = svg.outerHTML;
	var newsvg = newspan.querySelector("svg");

	newsvg.setAttribute("width", mmwidth + "mm");
	newsvg.setAttribute("height", mmheight + "mm");

	var pdfOptions = {};
	pdfOptions.fontCallback = svgFontCallback;
	var pdf = new PDFDocument({
		useCSS:        true,
		compress:      true,
		autoFirstPage: false,
		layout:        orientation
	});

	var stream = pdf.pipe(blobStream());
	stream.on('finish', function() {
		var blob = stream.toBlob('application/pdf');
		var pdfFilebase = getFilenameBase();
		var pdfFilename = pdfFilebase;
		//if (SAVEFILENAME) {
		//	pdfFilename = SAVEFILENAME.replace(/\.[^.]*$/, "") + "-snapshot.pdf";
		//} else {
		//	pdfFilename = "snapshot.pdf";
		//}
		if (pdfFilename) {
			pdfFilename += "-snapshot.pdf";
		} else {
			pdfFilename = "snapshot.pdf";
		}
		saveAs(blob, pdfFilename);
		document.body.classList.remove("waiting");
		//$('html').css('cursor', 'auto');
	});

	loadPdfFonts(pdf)
	.then(function() {
		pdf.addPage({size: format, layout: orientation});
		SVGtoPDF(pdf, newsvg, x, y, pdfOptions);
		pdf.end();
	});
}

Object.defineProperty(POPC2.prototype.generatePdfSnapshot, "name", { value: "generatePdfSnapshot" });



