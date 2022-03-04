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
	let oldOptions = vrvWorker.options;
	// need to explicitly disable mmOutput = 1 set by the printing process.
	oldOptions.mmOutput = 0;

	this.ShowWaitingCursor();

	format = format ? format : "letter";
	orientation = orientation ? orientation : "portrait";

	//let width = 2159;
	//let height = 2794;
	//let height = 2920;

	//if (format === "A4") {
		let width = 2100;
		let height = 2970;
	//} else if (format === "B3") {
	//	width = 2500;
	//	height = 3530;
	//}
	if (orientation === "landscape") {
		width = [height, height = width][0];
	}

	let that = this;
	let pdfOptions = {};
	pdfOptions.fontCallback = this.svgFontCallback;

	let pdf = new PDFDocument({
		useCSS:        true,
		compress:      true,
		autoFirstPage: false,
		layout:        orientation
	});
	let stream = pdf.pipe(blobStream());
	stream.on('finish', function() {
		let blob = stream.toBlob('application/pdf');
		let pdfFilebase = "DATA";
		if (that.VARS.WORK_ID) {
			pdfFilebase = that.VARS.WORK_ID;
			let matches = that.VARS.HUMDRUM[that.VARS.WORK_ID].match(/!!!!SEGMENT:\s*([^\s]+)/);
			if (matches) {
				pdfFilebase = matches[1].replace(/\.krn$/, "");
			}
		}
		let pdfFilename = pdfFilebase;
		if (pdfFilename) {
			pdfFilename += ".pdf";
		} else {
			pdfFilename = "data.pdf";
		}
		saveAs(blob, pdfFilename);
		that.ClearWaitingCursor();
	});

	let scale = 95;
	height /= scale / 100;
	width  /= scale / 100;

	// let spacingBraceGroup   = 12;
	// let spacingBracketGroup = 12;
	let spacingStaff        = 10;
	let spacingSystem       = 14;
	let pageMarginTop       = 100;
	let pageMarginBottom    = 100;
	let pageMarginLeft      = 50;
	let pageMarginRight     = 50;

	let vrvOptions = {
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

	let scoredata = this.VARS.HUMDRUM[this.VARS.WORK_ID];
	scoredata += "\n!!!filter: shed -e s/t=P://L | shed -e s/:problem/:PROBLEM/L\n";
	// scoredata += "!!!header-center: " + HUMDRUMFILETITLE + "\n";
	scoredata += "!!!header-left: \n";
	//scoredata += "!!!header-left: @{PPR}, @{PPP}\n";

	let url = `https://polishscores.org?${this.VARS.WORK_ID}\n`;
	scoredata += `!!!footer-left: \\n\\n${url}\n`;
	scoredata += "!!!footer-right: \\n\\n%P\n"

	//let staffcount = getStaffCount(scoredata);
	//if (staffcount == 2) {
	//	//vrvOptions.justifySystemsOnly = 1;
	//	//vrvOptions.justifyIncludeLastPage = 1;
	//}

	//if (GLOBALFILTER) {
	//	scoredata += "\n!!!filter: " + GLOBALFILTER + "\n";
	//}

	vrvOptions = this.cleanOptions2(scoredata, vrvOptions);

	// Include options from the notation configuration menu:
	vrvOptions = this.addNotationConfigureOptions(vrvOptions);
	vrvOptions = this.addAnalysisOptions(vrvOptions);
	vrvOptions = this.addWorkPageSearchOptions(vrvOptions);

	// Remove the filter parameters since those are for HNP only.
	// Instead, insert into Humdrum data.
	if (vrvOptions.filter) {
		let filter = vrvOptions.filter;
		delete vrvOptions.filter;
		if (typeof filter === "string") {
			scoredata += `!!!filter: ${filter}\n`;
		} else {
			for (let i=0; i<filter.length; i++) {
				scoredata += `!!!filter: ${filter[i]}\n`;
			}
		}
	}

	RSVP.hash({
		fonts: this.loadPdfFonts(pdf),
		svglist: vrvWorker.renderAllPages(scoredata, vrvOptions)
	})
	.then(function(data) {
		for (let i=0; i < data.svglist.length; i++) {
			pdf.addPage({size: format, layout: orientation});
			let x = 0;
			let y = 0;
			SVGtoPDF(pdf, data.svglist[i], x, y, pdfOptions);
		}
		pdf.end();
		return true;
	})
	.finally(function() {
		// restore the old layout for the VHV  webpage:
		let force = false;
		let page = vrvWorker.page;
		let cleanoldoptions = that.cleanOptions2(scoredata, oldOptions);
		vrvWorker.redoLayout(oldOptions, true);
		vrvWorker.options = oldOptions;
	});
}

Object.defineProperty(POPC2.prototype.cleanOptions2, "name", { value: "cleanOptions2" });



