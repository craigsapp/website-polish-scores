{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 02:28:52 PDT 2021
// Last Modified: Fri Oct  8 02:28:54 PDT 2021
// Filename:      _includes/shared/GetBase64Image.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Given an img element as input, the function will
//                extract the image as a JPG image as a base-64 string.
//
{% endcomment %}

POPC2.prototype.GetBase64Image = function (img) {
	this.DebugMessageFunction();
	let canvas = document.createElement("canvas");
	let context = canvas.getContext("2d");
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	context.drawImage(img, 0, 0);
	return canvas.toDataURL('image/jpeg');
};

Object.defineProperty(POPC2.prototype.GetBase64Image, "name", { value: "GetBase64Image" });



