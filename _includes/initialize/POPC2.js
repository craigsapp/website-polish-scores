{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 10:27:38 PDT 2021
// Last Modified: Thu Nov 25 02:04:08 CET 2021
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
	// Repertory-based variables  -- REPERTORY indicates which repository to
	// use as a basis for the website.  The CGI parameter "r" or "repertory"
	// can be set to "popc1" to display Chopin First Edition scores instead
	// of the Polish Digital Scores files.
	//
	this.VARS.REPERTORY = "popc2";


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

	// SEARCH_INDEX -- The active list of scores to search on the browse page.
	// This can be either SCORE_INDEX when doing regular browsing, or it can
	// be WORK_BOOKMARKS when viewing bookmarks, or WORK_HISTORY when viewing
	// history.
	this.VARS.SEARCH_INDEX = [];

	// COMPOSER_INDEX -- A list of the composers indexed by the composer's names,
	// downloaded from {{ site.composer_index}}
	this.VARS.COMPOSER_INDEX = {};

	// SIGLUM_INDEX -- A list of RISM sigla giving name and URL for libraries.
	// downloaded from {{ site.siglum_index }}.  Indexed by siglum (country-library).
	this.VARS.SIGLUM_INDEX = {};

	// INSTRUMENT_INDEX -- A list of Humdrum instrument codes and English/Polish names.
	// downloaded from {{ site.instrument_index }}.  Indexed by instrument code.
	this.VARS.INSTRUMENT_INDEX = {};


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
	this.VARS.BROWSE_STYLE = "more";

	// SEARCH_RESULTS -- The list of matches from the last search on the browse page.
	this.VARS.SEARCH_RESULTS = [];

	// SEARCH -- List of parameters for browse page searching.
	this.VARS.SEARCH = {};

	// SEARCH_URL -- Temporary holder for search fields to add to URL:
	this.VARS.SEARCH_URL = {};

	// BROWSE_DELETE_HIGHLIGHT -- boolean for highlighting delete button to clear parameters.
	this.VARS.BROWSE_DELETE_HIGHLIGHT = false;

	// SEARCH_FREEZE -- State variable used to avoid recursive
	// updating of search drop-down menus when searching.
	this.VARS.SEARCH_FREEZE = false;

	// SEARCH_SORT_TYPE -- what sort of sorting to apply to search results.
	// Allowed values are:
	//     null:       Do not sort (uses cenid order).
	//    "notecount": Sort by the number of notes in the score.
	//    "shelfmark": Sort by shelfmark of the works.
	//    "title":     Sort by titles of the works.
	//    "composer":  Sort by composers' names.
	this.VARS.SEARCH_SORT_TYPE = "composer";

	// this.VARS.SAVED_SORT_TYPE -- sort choice for browsing before bookmark/history.
	// The sort method that should be restore when returning from bookmark/history.
	this.VARS.SAVED_SORT_TYPE = "composer";

	// SEARCH_SORT_TYPE_PREV -- the previous sorting method (used for
	// toggling sort methods.
	this.VARS.SEARCH_SORT_TYPE_PREV = null;

	// SEARCH_SORT_REVERSE -- sort in normal or reversed order.
	this.VARS.SEARCH_SORT_REVERSE = false;

	// DOWNLOAD_SIGLUM_INDEX_COUNT -- cound the number of times that the siglum
	//     index is attempted to be downloaded.
	this.VARS.DOWNLOAD_SIGLUM_INDEX_COUNT = 0;

	// DOWNLOAD_INSTRUMENT_INDEX_COUNT -- cound the number of times that the instrument
	//     index is attempted to be downloaded.
	this.VARS.DOWNLOAD_INSTRUMENT_INDEX_COUNT = 0;

	/////////////////////////////
	//
	// SEARCH_FLAGS -- Filter searches by various properties of scores.
	//

	this.VARS.SEARCH_FLAGS = {};
	this.VARS.SEARCH_FLAGS.MODERN        = false;  // Search only files with modernized scores.
	this.VARS.SEARCH_FLAGS.IIIF          = false;  // Search only files with IIIF bounding boxes.
	this.VARS.SEARCH_FLAGS.BASSOCONTINUO = false;  // Search only files with basso continuo figures.
	this.VARS.SEARCH_FLAGS.TEXT          = 0;      // Search only files containg lyrical text.
	                                               //   0 = search both texted and textless works.
	                                               //   1 = search texted works.
	                                               //   2 = search textles works.
	this.VARS.SEARCH_FLAGS.SINGLE        = false;  // Search only files that contain single-layer parts.


	//////////////////////////////
	//
	// Variables primarily related to work page:
	//

	// WORK_ID -- Work ID of score being displayed.
	this.VARS.WORK_ID = null;

	// WORK_HISTORY -- List of works that have been shown during the current session.
	this.VARS.WORK_HISTORY = [];

	// WORK_BOOKMARKS -- List of works that are bookmarked (array of SCORE Index
	// entries).  The list is stored in localStorage.BOOKMARKS for access in
	// later sessions (as a JSON array of fileids).
	this.VARS.WORK_BOOKMARKS = [];

	// RESTORE_TOOLS -- unhide any selected tool when returning from the browse page.
	this.VARS.RESTORE_TOOLS = false;

	// KEYSCAPE -- info about the keyscape interface.
	this.VARS.KEYSCAPE = {};

	// KEYSCAPE.INFO -- timing informat for each double-wide pixel column
	// in a keyscape.  This is used to display measure ranges in keyscapes.
	// There should be 300 entries in the array, since keyscapes are set to 600px.
	this.VARS.KEYSCAPE.INFO = {};

	// KEYSCAPE.INITIALIZED -- true when the URL parameters have not yet been checked 
	// for a keyscape measure selection.
	this.VARS.KEYSCAPE.INITIALIZED = 0;

	// KEYSCAPE.FREEZE -- true when selecting a region of the score to display.
	this.VARS.KEYSCAPE.FREEZE = 0;

	// KEYSCAPE.ID -- the work ID of the score that the keyscape is being displayed.
	// this is needed to deactivate the keyscape measure range when switching to
	// a new score.
	this.VARS.KEYSCAPE.ID = null;

	// KEYSCAPE.SELECT_START_MEASURE -- The first measure to display when selecting a range
	// from the keyscape.
	this.VARS.KEYSCAPE.SELECT_START_MEASURE = -1;

	// KEYSCAPE.SELECT_END_MEASURE -- The last measure to display when selecting a range
	// from the keyscape.
	this.VARS.KEYSCAPE.SELECT_END_MEASURE = -1;

	// KEYSCAPE.MOUSE_START_MEASURE -- The first measure to display when moving the mouse.
	this.VARS.KEYSCAPE.MOUSE_START_MEASURE = -1;

	// KEYSCAPE.MOUSE_END_MEASURE -- The last measure to display when moving the mouse.
	this.VARS.KEYSCAPE.MOUSE_END_MEASURE = -1;

	// KEYSCAPE.SELECT_MOUSE_X -- X position of selection.
	this.VARS.KEYSCAPE.SELECT_MOUSE_X = -1;

	// KEYSCAPE.SELECT_MOUSE_Y -- Y position of selection.
	this.VARS.KEYSCAPE.SELECT_MOUSE_Y = -1;

	// KEYSCAPE.SELECT_MOUSE_X -- X position of selection.
	this.VARS.KEYSCAPE.MOUSE_X = -1;

	// KEYSCAPE.SELECT_MOUSE_Y -- Y position of selection.
	this.VARS.KEYSCAPE.MOUSE_Y = -1;

	// KEYSCAPE.CANVAS -- Canvas element for keyscape.
	this.VARS.KEYSCAPE.CONTEXT = null;

	// KEYSCAPE.CURSOR_CANVAS -- Canvas element for triangle cursor.
	this.VARS.KEYSCAPE.CURSOR_CONTEXT = null;

	// KEYSCAPE.CURSOR_CONTEXT -- Context element for triangle cursor.
	this.VARS.KEYSCAPE.CURSOR_CONTEXT = null;

	// KEYSCAPE.KEYINFO_ELEMENT -- Element where key info is displayed.
	this.VARS.KEYSCAPE.KEYINFO_ELEMENT = null;

	// TIMEMAP -- quarter note to time in seconds mapping.
	this.VARS.TIMEMAP = {};

	// CURSOR_NOTE -- used to highlight the current note at the location
	// of the cursor.
	this.VARS.CURSOR_NOTE = null;

	// RESTORE_CURSOR_NOTE: Used to go back to a highlighted note after a redraw.
	// This is an ID string rather than an element.
	this.VARS.RESTORE_CURSOR_NOTE_ID = "";

	// KEYSCAPE.MODERNIZE -- true when embedded modern filter (or default modern filter)
	// should be applied before rendering the score.
	this.VARS.MODERNIZE = false;


	//////////////////////////////
	//
	// Variables related to MIDI playback.
	//

	// MIDI_DELAY -- Used to delay MIDI playback for alignment.
	this.VARS.MIDI_DELAY = 0;

	// CURSOR_NOTE -- Used to highlight the current note at the location of the cursor.
	this.VARS.CURSOR_NOTE = null;

	// RESTORE_CURSOR_NOTE -- Used to go back to a highlighted note after a redraw.
	// This is an ID string rather than an element.
	this.VARS.RESTORE_CURSOR_NOTE = null;


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
		humType: 1,
		autoResize: true,
		spacingSystem: 12
	};

	// MARKER -- HNP Marker object.
	this.VARS.MARKER = null;


	//////////////////////////////
	//
	// IIIF variables.
	//

	// IIIF_MANIFEST: List of manifest derived information
	// indexed by work ID and manifest ID.
	this.VARS.IIIF_MANIFEST = {};


	//////////////////////////////
	//
	// Analysis variables
	//
	
	// WORDLIST: List of extracted lyrics for the currently displayed work.
	this.VARS.WORDLIST = {};
	
	// LASTWORD: Keep track of the last word highlighed in the extracted lyrics.
	this.VARS.LASTWORD = "";


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

		background_image:   "{{ site.background_image     }}",
		languages:           {{ site.languages | jsonify  }} ,
		debug:              "{{ site.debug                }}",
		debug_verbose:      "{{ site.debug_verbose        }}",
		tab_title:          "{{ site.tab_title            }}",

		github_addr_popc1:  "{{ site.github_addr_popc1    }}",
		github_addr_popc2:  "{{ site.github_addr_popc2    }}",

		main_data_server:   {
			data_addr:          "{{ site.data_addr1           }}",

			score_index:        "{{ site.score_index_popc2   }}", // active score index
			score_index_popc1:  "{{ site.score_index_popc1   }}",
			score_index_popc2:  "{{ site.score_index_popc2   }}",

			lyrics_index:       "{{ site.lyrics_index_popc2  }}", // active lyrics index
			lyrics_index_popc1: "{{ site.lyrics_index_popc1  }}",
			lyrics_index_popc2: "{{ site.lyrics_index_popc2  }}",

			composer_index:      "{{ site.composer_index_popc2}}", // active composer index
			composer_index_popc1:"{{ site.composer_index_popc1}}",
			composer_index_popc2:"{{ site.composer_index_popc2}}",

			siglum_index:        "{{ site.siglum_index1        }}", // library/archive info

			instrument_index:    "{{ site.instrument_index1    }}", // instrument info

			pitch_index:         "{{ site.pitch_index_popc2   }}", // active pitch index
			pitch_index_popc1:   "{{ site.pitch_index_popc1   }}",
			pitch_index_popc2:   "{{ site.pitch_index_popc2   }}",
		},

		mirror_data_server:   {

			// URLs for data/indexes:

			data_addr:          "{{ site.data_addr2           }}",

			score_index:        "{{ site.score_index2_popc2    }}", // active score index
			score_index_popc1:  "{{ site.score_index2_popc1    }}",
			score_index_popc2:  "{{ site.score_index2_popc2    }}",

			lyrics_index:       "{{ site.lyrics_index2_popc2   }}", // active lyrics index
			lyrics_index_popc1: "{{ site.lyrics_index2_popc1   }}",
			lyrics_index_popc2: "{{ site.lyrics_index2_popc2   }}",

			composer_index:      "{{ site.composer_index2_popc2}}", // active composer index
			composer_index_popc1:"{{ site.composer_index2_popc1}}",
			composer_index_popc2:"{{ site.composer_index2_popc2}}",

			siglum_index:        "{{ site.siglum_index2        }}", // library/archive info

			instrument_index:    "{{ site.instrument_index2    }}", // instrument info

			pitch_index:         "{{ site.pitch_index2_popc2    }}", // active pitch index
			pitch_index_popc1:   "{{ site.pitch_index2_popc1    }}",
			pitch_index_popc2:   "{{ site.pitch_index2_popc2    }}",
		},

		// Website coloring styles:
		h1_color:            "{{ site.h1_color             }}",
		h2_color:            "{{ site.h1_color             }}",
		h3_color:            "{{ site.h1_color             }}",
		th_color:            "{{ site.th_color             }}",
		button_hover_color:  "{{ site.button_hover_color   }}",

		// Other CSS settings:
		max_content_width:   "{{ site.max_content_width    }}",

		// Notation settings:
		size_increment:       {{ site.size_increment       }},

		// Image locations:
		composer_images:     "{{ site.composer_images      }}",
		library_images:      "{{ site.library_images       }}"

	};

	// Select the main data server by default:
	let server = "main_data_server";
	// let server = "mirror_data_server";
	for (p in this.SETTINGS[server]) {
		this.SETTINGS[p] = this.SETTINGS[server][p];
		// console.warn(`TRANSFERRING ${p} :: ${this.SETTINGS[p]}`);
	}

}


 
