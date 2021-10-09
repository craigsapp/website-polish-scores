{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 10:27:38 PDT 2021
// Last Modified: Fri Oct  8 10:27:41 PDT 2021
// Filename:      _includes/initialize/POPC2.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   Storage location for POPC2 website variables and functions.
//
{% endcomment %}

function POPC2() {

	// GLOBAL: storage for variables accessible outside of prototype functions:
	this.GLOBAL = {};

	//////////////////////////////
	//
	// General variables related to all subpages:
	//

	// LANGUAGE == The Language of the webpage, used to select the
	// desired translations.
	this.GLOBAL.LANGUAGE = null;


	//////////////////////////////
	//
	// Variables related to downloaded data.
	//

	// BROWSE_INDEX == A file list downloaded from {{ site.browse_index}}
	this.GLOBAL.BROWSE_INDEX = [];

	// COMPOSERS == A list of the composers indexed by the composer's names,
	// downloaded from {{ site.composer_index}}
	this.GLOBAL.COMPOSERS = {};


	//////////////////////////////
	//
	// Variables primarily related to the Browse page:
	//

	// BROWSE_RESULTS == The list of matches from the last
	// search on the browse page.
	this.GLOBAL.BROWSE_RESULTS = [];

	// SEARCH == List of parameters for browse page searching:
	this.GLOBAL.SEARCH = {};

	// SEARCH_FREEZE == State variable used to avoid recursive
	// updating of search drop-down menus when searching.
	this.GLOBAL.SEARCH_FREEZE = false;


	//////////////////////////////
	//
	// Variables primarily related to work page:
	//

	// WORK_ID = work id of score to be displayed.
	this.GLOBAL.WORK_ID = null;


	//////////////////////////////
	//
	// Variables related to translations:
	//

	// TRANSLATIONS == A lookup table of translations indexed by
	//    translation key.
	this.GLOBAL.TRANSLATIONS = {};


	//////////////////////////////
	//
	// Variables related to portraits:
	//

	// PORTRAITS == A lookup table of composer portraits indexed by
	//    composer's name.
	this.GLOBAL.PORTRAITS = {};


	//////////////////////////////
	//
	// Variables related to work pages:
	//

	// HUMDRUM == A lookup table of downloaded Humdrum files, indexed
	//    by id (cinid, fileid, sqlid).
	this.GLOBAL.HUMDRUM = {};

	// HNP_OPTIONS == A list of options for displaying Humdrum scores,
	// along with default options.
	this.GLOBAL.HNP_OPTIONS = {
		scale: 39,
		autoResize: true,
		spacingSystem: 20
	};

	//////////////////////////////
	//
	// SETTINGS -- Parameters set in ../../_config.yml, such as the URLs for
	// data to download and the list of languages to display at the top right side
	// of pages.  See the meaning of each variable in the ../_config.yml file.
	//

	this.SETTINGS = {
		tab_title:          "{{ site.tab_title           }}",
		data_addr:          "{{ site.data_addr           }}",
		browse_index:       "{{ site.browse_index        }}",
		lyrics_index:       "{{ site.lyrics_index        }}",
		composer_index:     "{{ site.composer_index      }}",
		background_image:   "{{ site.background_image    }}",
		languages:          {{ site.languages | jsonify  }},
		debug:              "{{ debug                    }}",
		h1_color:           "{{ site.h1_color            }}",
		h2_color:           "{{ site.h1_color            }}",
		h3_color:           "{{ site.h1_color            }}",
		th_color:           "{{ site.th_color            }}",
		button_hover_color: "{{ site.button_hover_color  }}"
	};

}



