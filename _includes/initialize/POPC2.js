{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 10:27:38 PDT 2021
// Last Modified: Sun Oct 17 09:10:53 PDT 2021
// Filename:      _includes/initialize/POPC2.js
// Used by:
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   Storage object for POPC2 website variables and functions.
//
{% endcomment %}

function POPC2() {

	// VARS: storage for variables accessible outside of prototype functions:
	this.VARS = {};


	//////////////////////////////
	//
	// General variables related to all subpages:
	//

	// LANGUAGE -- The Language of the webpage, used to select the
	// desired translations.
	this.VARS.LANGUAGE = null;


	//////////////////////////////
	//
	// Variables related to downloaded data.
	//

	// SCORE_INDEX -- A file list downloaded from this.SETTINGS.score_index.
	this.VARS.SCORE_INDEX = [];

	// COMPOSER_INDEX -- A list of the composers indexed by the composer's names,
	// downloaded from {{ site.composer_index}}
	this.VARS.COMPOSER_INDEX = {};


	//////////////////////////////
	//
	// Variables primarily related to the Browse page:
	//

	// BROWSE_MENU_OPTIONS -- List of all options in various browse select menus.
	// Indexed by select ID.
	this.VARS.BROWSE_MENU_OPTIONS = {};

	// BROWSE_STYLE -- Variable to keep track of more/less style to display
	// browse form in.  Default is in less mode, but localStorage.BROWSE_STYLE
	// will keep track of the desired style across multiple sessions.
	this.VARS.BROWSE_STYLE = "less";

	// SEARCH_RESULTS -- The list of matches from the last search on the browse page.
	this.VARS.SEARCH_RESULTS = [];

	// SEARCH -- List of parameters for browse page searching.
	this.VARS.SEARCH = {};

	// SEARCH_FREEZE -- State variable used to avoid recursive
	// updating of search drop-down menus when searching.
	this.VARS.SEARCH_FREEZE = false;


	//////////////////////////////
	//
	// Variables primarily related to work page:
	//

	// WORK_ID = work id of score being displayed
	this.VARS.WORK_ID = null;


	//////////////////////////////
	//
	// Variables related to translations:
	//

	// TRANSLATIONS -- A lookup table of translations indexed by
	//    translation key.
	this.VARS.TRANSLATIONS = {};


	//////////////////////////////
	//
	// Variables related to portraits:
	//

	// PORTRAIT_IMAGES -- A lookup table of composer portraits indexed by
	//    composer's name.
	this.VARS.PORTRAIT_IMAGES = {};


	//////////////////////////////
	//
	// Variables related to work pages:
	//

	// HUMDRUM -- A lookup table of downloaded Humdrum files, indexed
	//    by id (cinid, fileid, sqlid).
	this.VARS.HUMDRUM = {};

	// HNP_OPTIONS -- A list of options for displaying Humdrum scores,
	// along with default options.
	this.VARS.HNP_OPTIONS = {
		scale: 39,
		autoResize: true,
		spacingSystem: 20
	};


	//////////////////////////////
	//
	// Other interface state variables:
	//

	// PROBLEM_TEXT: text to show in problem markers in verovio notation.
	// The options are null (or ""), and "&#xf071;", which is the
	// FontAwsome caution icon.
	this.VARS.PROBLEM_TEXT = false;

	// SVG_OBSERVER: Observer watching SVG image to add problem/sic markers.
	this.VARS.SVG_OBSERVER = null;

	// INITIALIZE_WORK_PAGE: Used for the "w" keyboard shortcut to suppress
	// displaying the work page if no work has been shown before.
	this.VARS.INITIALIZED_WORK_PAGE = false;


	//////////////////////////////
	//
	// SETTINGS -- Parameters set in ../../_config.yml, such as the URLs for
	// data to download and the list of languages to display at the top right side
	// of pages.  See the meaning of each variable in the ../_config.yml file.
	//

	this.SETTINGS = {

		background_image:   "{{ site.background_image    }}",
		languages:           {{ site.languages | jsonify }} ,
		debug:              "{{ site.debug               }}",
		debug_verbose:      "{{ site.debug_verbose       }}",
		tab_title:          "{{ site.tab_title           }}",

		// URLs for data/indexes:
		data_addr:          "{{ site.data_addr           }}",
		score_index:        "{{ site.score_index         }}",
		lyrics_index:       "{{ site.lyrics_index        }}",
		composer_index:     "{{ site.composer_index      }}",
		pitch_index:        "{{ site.pitch_index         }}",

		// Website coloring styles:
		h1_color:           "{{ site.h1_color            }}",
		h2_color:           "{{ site.h1_color            }}",
		h3_color:           "{{ site.h1_color            }}",
		th_color:           "{{ site.th_color            }}",
		button_hover_color: "{{ site.button_hover_color  }}",

		// Other CSS settings:
		max_content_width:  "{{ site.max_content_width   }}",

		// Notation settings:
		size_increment:     {{ site.size_increment  }}

	};

}



