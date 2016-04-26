/*
 *  This file is for the Cranmore Ski Map
 *  It will pull in a JSON file and load up the open / closed trails onto
 *  an image displayed using HTML.
 *
 *  File created: 1/28/2016 12:30PM EST
 *   Last edited: 4/25/2016 11:00PM EST
 *    Created by: Jason Downing
 *
 */

/*
    Global color variables
    Red   = CLOSED
    Green = OPEN
*/
var open_color = "006600";
var closed_color = "A30002";

// JSON data for Cranmore
var nov15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

var dec15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

var jan15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

var feb15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

var mar15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

var apr15_json = {
  "waterville_closed": [

  ],
  "waterville_open": [

  ]
};

$(document).ready(function() {
  // This is from the maphilight docs, and has been changed for the Ski Trail
  // highlighting to look "better", basically yellowish instead of dark gray.
  $.fn.maphilight.defaults = {
    fill: true,
    fillColor: closed_color,
    fillOpacity: 0.5,
    stroke: false,
    strokeColor: '000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    fade: false,
    alwaysOn: true,
    neverOn: false,
    groupBy: false,
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: '000000',
    shadowOpacity: 0.8,
    shadowPosition: 'outside',
    shadowFrom: false
  }

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map_cmt');
  $('img[usemap]').rwdImageMaps();

  // This is a total hack, but if it works, I'm happy.
  color_yellow();
  color_red();

});

// Change all the highlighting to yellow.
function color_yellow() {
  var trails_on = [];

  // This goes through and changes all the maphilight data "fillColor" properties
  // to "FFEA1C" which is the same yellow color I set as "default" for all areas.
  $("area").each(function(){
    console.log("CHANGING COLORS to YELLOW");
    $(this).data('maphilight', {"fillColor": open_color});
    trails_on.push($(this).attr("alt"));
  });

  // All trails
  console.log(trails_on);

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map_cmt');
  $('img[usemap]').rwdImageMaps();

  return true;
}

// Change all the highlighting to red.
function color_red() {


  // This goes through and changes all the maphilight data "fillColor" properties
  // to "A30002" which is a red color.
  $("area").each(function(){
    console.log("CHANGING COLORS to RED");
    $(this).data('maphilight', {"fillColor": closed_color});
  });

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map_cmt');
  $('img[usemap]').rwdImageMaps();

  return true;
}
