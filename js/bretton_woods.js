/*
 *  This file is for the Bretton Woods Dynamic Ski Map
 *  It will pull in a JSON file and load up the open / closed trails onto
 *  an image displayed using HTML.
 *
 *  File created: 1/28/2016 12PM EST
 *   Last edited: 4/6/2016   7PM EST
 *    Created by: Jason Downing
 *
 */

var ski_data;

$(function(){
  $("#ski_area_map").load("maps/bretton_woods.map");
});

$(document).ready(function() {
  // Get open / closed trails from json file "ski.json"
  // https://stackoverflow.com/questions/15764844/jquery-getjson-save-result-into-variable
  $.getJSON("json/ski.json", function(data) {
    ski_data = data;
  });

  // This is from the maphilight docs, and has been changed for the Ski Trail
  // highlighting to look "better", basically yellowish instead of dark gray.
  $.fn.maphilight.defaults = {
    fill: true,
    fillColor: 'A30002',
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
  $('.map').maphilight().parent().addClass('center-map');
});

// Change all the highlighting to yellow.
function color_yellow() {

  // This goes through and changes all the maphilight data "fillColor" properties
  // to "FFEA1C" which is the same yellow color I set as "default" for all areas.
  $("area").each(function(){
    console.log("CHANGING COLORS to YELLOW");
    $(this).data('maphilight', {"fillColor":"FFEA1C"});
  });

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map');
  return true;
}

// Change all the highlighting to red.
function color_red() {
  // This goes through and changes all the maphilight data "fillColor" properties
  // to "A30002" which is a red color.
  $("area").each(function(){
    console.log("CHANGING COLORS to RED");
    $(this).data('maphilight', {"fillColor":"A30002"});
  });

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map');

  return true;
}

// Change just "lower bobby's run" to blue.
function bobbys_run() {
  // This only changes one ID, as a proof of concept for dynamically styling each
  // trail area.
  console.log("CHANGING COLORS to BLUE for BOBBYS RUN");

  $("area").each(function(){
    var compare = "Upper Bobbys";

    //console.log("Trail: " + compare + " attr: " + $(this).attr("alt"));

    if(compare == $(this).attr("alt")) {
      console.log("Changing color for Bobby's Run");
      $(this).data('maphilight', {"fillColor":"0000FF"});
    }
  });

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map');

  return true;
}

// Change the highlighting given a list of trails.
function color_list() {
  console.log(ski_data);

  // List of trails open / closed.
  var open_trails = ski_data.waterville_open;
  var closed_trails = ski_data.waterville_closed;

  console.log("open trails: " + open_trails);
  console.log("closed trails: " + closed_trails);

  // Open Trails
  $("area").each(function(){
    for (trail in open_trails) {
      var compare = open_trails[trail];

      if(compare == $(this).attr("alt")) {
        $(this).data('maphilight', {"fillColor":"FFEA1C"});
      }
    }
  });

  // Closed Trails
  $("area").each(function(){
    for (trail in closed_trails) {
      var compare = closed_trails[trail];

      if(compare == $(this).attr("alt")) {
        $(this).data('maphilight', {"fillColor":"A30002"});
      }
    }
  });

  // Center the map using this helpful SO post
  // https://stackoverflow.com/questions/1760586/how-to-align-the-jquery-maphilight-to-center
  $('.map').maphilight().parent().addClass('center-map');

  return true;
}

