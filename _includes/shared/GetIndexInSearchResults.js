{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 18:36:35 PDT 2021
// Last Modified: Tue Oct 12 18:36:39 PDT 2021
// Filename:      _includes/shared/GetIndexInSearchResults.js
// Used by:       _includes/work/displayScores.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the index position of a fileid/cenid/nifcid from
//                in the search index.  If it is not found, then this
//                function returns -1.  Inputs:
//                  id == required string containing a workd ID.
//                  index == optional array of work entries to search.
//
{% endcomment %}

POPC2.prototype.GetIndexInSearchResults = function (id, index) {
	this.DebugMessageFunctionVerbose(id);
	return this.GetIndexAndTypeInSearchResults(id, index).index;
};

Object.defineProperty(POPC2.prototype.GetIndexInSearchResults, "name", { value: "GetIndexInSearchResults" });



