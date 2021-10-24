{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 18:58:40 PDT 2021
// Last Modified: Tue Oct 12 18:58:42 PDT 2021
// Filename:      _includes/shared/GetIndexAndTypeInSearchResults.js
// Used by:       _includes/work/displayScores.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the index position of a fileid/cenid/nifcworkid from
//                in the search index.  If it is not found, then this
//                function returns -1 and the type "unkown"; otherwise,
//                the index and the property name in the object where
//                the ID is stored will be returned.
//
//                Input parameters:
//                  id == required string containing a workd ID.
//                  index == optional array of work entries to search.
//
{% endcomment %}

POPC2.prototype.GetIndexAndTypeInSearchResults = function (id, index) {
	this.DebugMessageFunctionVerbose(id);

	if (!id) {
		return {index: -1, type: "unknown"};
	}
	if (!index) {
		index = this.VARS.SEARCH_RESULTS;
	}

	for (let i=0; i<index.length; i++) {
		let fileid = index[i].fileid;
		let cenid  = index[i].cenid;
		let nifcworkid = index[i].nifcworkid;
		if (fileid === id) {
			return {index: i, type: "fileid"};
		}
		if (cenid  === id) {
			return {index: i, type: "cenid"};
		}
		if (nifcworkid === id) {
			return {index: i, type: "nifcworkid"};
		}
	}

	return {index: -1, type: "unknown"};
};

Object.defineProperty(POPC2.prototype.GetIndexAndTypeInSearchResults, "name", { value: "GetIndexAndTypeInSearchResults" });



