

// Global variables are stored in the GLOBAL object for 
// maintenance ease:
let GLOBAL = {};


//////////////////////////////
//
// Gerneral variables related to all subpages:
//

// LANGUAGE == The Language of the webpage, used to select the
// desired translations.
GLOBAL.LANGUAGE = null;


//////////////////////////////
//
// Variables related to downloaded data.
//

// BROWSE_INDEX == A file list downloaded from
// {{ site.browse_index}}
GLOBAL.BROWSE_INDEX = [];

// COMPOSERS == A list of the composers indexed by the composer's names,
// downloaded from {{ site.composer_index}}
GLOBAL.COMPOSERS = {};


//////////////////////////////
//
// Variables primarily related to the Browse page:
//

// BROWSE_RESULTS == The list of matches from the last
// search on the browse page.
GLOBAL.BROWSE_RESULTS = [];

// SEARCH == List of parameters for browse page searching:
GLOBAL.SEARCH = {};

// SEARCH_FREEZE == State variable used to avoid recursive
// updating of search drop-down menus when searching.
GLOBAL.SEARCH_FREEZE = false;


//////////////////////////////
//
// Variables related to translations:
//

// TRANSLATIONS == A lookup table of translations indexed by
//    translation key.
GLOBAL.TRANSLATIONS = {};


//////////////////////////////
//
// Variables related to portraits:
//

// PORTRAITS == A lookup table of composer portraits indexed by
//    composer's name.
GLOBAL.PORTRAITS = {};



