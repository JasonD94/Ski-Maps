/*
 *  This file is for the Waterville Valley Dynamic Ski Map
 *  It will pull in a JSON file and load up the open / closed trails onto
 *  an image displayed using HTML.
 *
 *  File created: 1/28/2016 12:30PM EST
 *   Last edited: 3/7/2016 12:30PM EST
 *    Created by: Jason Downing
 *
 */

var ski_data;

//******************************************************************************
// This is a bad hack for the demo. In the future this won't be here.
var nov15_json = {
  "waterville_closed": [
    "Exhibition Poma",
    "White Peak Express Quad",
    "Valley Run Quad ",
    "Pasture J-Bar",
    "World Cup T-Bar",
    "Lower Meadows Double Chair",
    "Kinderpark Lift**For lessons only, closed to the public.\n",
    "The Pasture",
    "Baseway",
    "Kinder Park",
    "Leroy's Loop",
    "Revelation",
    "Stemtation",
    "Valley Run",
    "Main Street",
    "Ruthies Run",
    "Scramble",
    "Lower Stillness",
    "Rock Island",
    "Stillness",
    "And Tyler Too",
    "Bail Out",
    "Grimes Way",
    "Lower Periphery",
    "Lower Tippecanoe",
    "Lower White Caps",
    "No Grit",
    "Oblivion",
    "Old Tecumseh",
    "Palmers Way",
    "Periphery",
    "Higher Ground",
    "Sidewinder",
    "Siegel Street",
    "Sun Run",
    "Tangent",
    "Terrys Trail",
    "Tippecanoe",
    "Tree Line",
    "Upper Bobbys",
    "Upper Valley Run",
    "White Caps",
    "Psyched Out",
    "South Street",
    "Ciao",
    "Gema",
    "Lower Sel's Choice",
    "Psyched",
    "Sel's Choice",
    "The Chute",
    "Tommy's World Cup Run",
    "True Grit",
    "Utter Abandon",
    "Exhibition",
    "WV Progression Park",
    "Exhibition",
    "South Street",
    "Northside Double Chair",
    "Sunnyside Triple Chair",
    "World Cup Triple Chair",
    "Boneyard",
    "Lower Bobby's Run",
    "Psyched "
  ],
  "waterville_open": [
  ]
};

var dec15_json = {
    "waterville_closed": [
      "Northside Double Chair",
      "Sunnyside Triple Chair",
      "World Cup Triple Chair",
      "Boneyard",
      "Lower Bobby's Run",
      "Psyched ",
      "Kinderpark Lift**For lessons only, closed to the public.\n",
      "Leroy's Loop",
      "Revelation",
      "Stemtation",
      "Valley Run",
      "Main Street",
      "Ruthies Run",
      "Scramble",
      "Lower Stillness",
      "Rock Island",
      "Stillness",
      "And Tyler Too",
      "Bail Out",
      "Grimes Way",
      "Lower Periphery",
      "Lower Tippecanoe",
      "Lower White Caps",
      "No Grit",
      "Oblivion",
      "Old Tecumseh"
    ],
    "waterville_open": [
      "Exhibition Poma",
      "White Peak Express Quad",
      "Valley Run Quad ",
      "Pasture J-Bar",
      "World Cup T-Bar",
      "Lower Meadows Double Chair",
      "The Pasture",
      "Baseway",
      "Kinder Park",
      "Palmers Way",
      "Periphery",
      "Higher Ground",
      "Sidewinder",
      "Siegel Street",
      "Sun Run",
      "Tangent",
      "Terrys Trail",
      "Tippecanoe",
      "Tree Line",
      "Upper Bobbys",
      "Upper Valley Run",
      "White Caps",
      "Psyched Out",
      "South Street",
      "Ciao",
      "Gema",
      "Lower Sel's Choice",
      "Psyched",
      "Sel's Choice",
      "The Chute",
      "Tommy's World Cup Run",
      "True Grit",
      "Utter Abandon",
      "Exhibition",
      "WV Progression Park",
      "Exhibition",
      "South Street"
    ]
};

var jan15_json = {
    "waterville_closed": [
      "Northside Double Chair",
      "Sunnyside Triple Chair",
      "World Cup Triple Chair",
      "Boneyard",
      "Lower Bobby's Run",
      "Psyched ",
      "Kinderpark Lift**For lessons only, closed to the public.\n",
      "Leroy's Loop",
      "Revelation",
      "Stemtation",
      "Valley Run",
      "Main Street",
      "Ruthies Run"
    ],
    "waterville_open": [
      "Exhibition Poma",
      "White Peak Express Quad",
      "Valley Run Quad ",
      "Pasture J-Bar",
      "World Cup T-Bar",
      "Lower Meadows Double Chair",
      "The Pasture",
      "Baseway",
      "Kinder Park",
      "Scramble",
      "Lower Stillness",
      "Rock Island",
      "Stillness",
      "And Tyler Too",
      "Bail Out",
      "Grimes Way",
      "Lower Periphery",
      "Lower Tippecanoe",
      "Lower White Caps",
      "No Grit",
      "Oblivion",
      "Old Tecumseh",
      "Palmers Way",
      "Periphery",
      "Higher Ground",
      "Sidewinder",
      "Siegel Street",
      "Sun Run",
      "Tangent",
      "Terrys Trail",
      "Tippecanoe",
      "Tree Line",
      "Upper Bobbys",
      "Upper Valley Run",
      "White Caps",
      "Psyched Out",
      "South Street",
      "Ciao",
      "Gema",
      "Lower Sel's Choice",
      "Psyched",
      "Sel's Choice",
      "The Chute",
      "Tommy's World Cup Run",
      "True Grit",
      "Utter Abandon",
      "Exhibition",
      "WV Progression Park",
      "Exhibition",
      "South Street"
    ]
};

var feb15_json = {
    "waterville_closed": [
    ],
    "waterville_open": [
      "Northside Double Chair",
      "Sunnyside Triple Chair",
      "World Cup Triple Chair",
      "Boneyard",
      "Lower Bobby's Run",
      "Psyched ",
      "Kinderpark Lift**For lessons only, closed to the public.\n",
      "Leroy's Loop",
      "Revelation",
      "Stemtation",
      "Valley Run",
      "Main Street",
      "Ruthies Run",
      "Exhibition Poma",
      "White Peak Express Quad",
      "Valley Run Quad ",
      "Pasture J-Bar",
      "World Cup T-Bar",
      "Lower Meadows Double Chair",
      "The Pasture",
      "Baseway",
      "Kinder Park",
      "Scramble",
      "Lower Stillness",
      "Rock Island",
      "Stillness",
      "And Tyler Too",
      "Bail Out",
      "Grimes Way",
      "Lower Periphery",
      "Lower Tippecanoe",
      "Lower White Caps",
      "No Grit",
      "Oblivion",
      "Old Tecumseh",
      "Palmers Way",
      "Periphery",
      "Higher Ground",
      "Sidewinder",
      "Siegel Street",
      "Sun Run",
      "Tangent",
      "Terrys Trail",
      "Tippecanoe",
      "Tree Line",
      "Upper Bobbys",
      "Upper Valley Run",
      "White Caps",
      "Psyched Out",
      "South Street",
      "Ciao",
      "Gema",
      "Lower Sel's Choice",
      "Psyched",
      "Sel's Choice",
      "The Chute",
      "Tommy's World Cup Run",
      "True Grit",
      "Utter Abandon",
      "Exhibition",
      "WV Progression Park",
      "Exhibition",
      "South Street"
    ]
};

var mar15_json = {
    "waterville_closed": [
      "Northside Double Chair",
      "Sunnyside Triple Chair",
      "World Cup Triple Chair",
      "Exhibition Poma",
      "Upper Bobbys",
      "Upper Valley Run",
      "White Caps",
      "Psyched Out",
      "South Street",
      "Ciao",
      "Gema",
      "Lower Sel's Choice"
    ],
    "waterville_open": [

      "White Peak Express Quad",
      "Valley Run Quad ",
      "Pasture J-Bar",
      "World Cup T-Bar",
      "Lower Meadows Double Chair",
      "Boneyard",
      "Lower Bobby's Run",
      "Psyched ",
      "Kinderpark Lift**For lessons only, closed to the public.\n",
      "Leroy's Loop",
      "Revelation",
      "Stemtation",
      "Valley Run",
      "Main Street",
      "Ruthies Run",
      "The Pasture",
      "Baseway",
      "Kinder Park",
      "Scramble",
      "Lower Stillness",
      "Rock Island",
      "Stillness",
      "And Tyler Too",
      "Bail Out",
      "Grimes Way",
      "Lower Periphery",
      "Lower Tippecanoe",
      "Lower White Caps",
      "No Grit",
      "Oblivion",
      "Old Tecumseh",
      "Palmers Way",
      "Periphery",
      "Higher Ground",
      "Sidewinder",
      "Siegel Street",
      "Sun Run",
      "Tangent",
      "Terrys Trail",
      "Tippecanoe",
      "Tree Line",
      "Psyched",
      "Sel's Choice",
      "The Chute",
      "Tommy's World Cup Run",
      "True Grit",
      "Utter Abandon",
      "Exhibition",
      "WV Progression Park",
      "Exhibition",
      "South Street"
    ]
};

var apr15_json = {
    "waterville_closed": [
      "Northside Double Chair",
      "Sunnyside Triple Chair",
      "World Cup Triple Chair",
      "Exhibition Poma",
      "Upper Bobbys",
      "Upper Valley Run",
      "White Caps",
      "Psyched Out",
      "South Street",
      "Ciao",
      "Gema",
      "Lower Sel's Choice",
      "Lower Periphery",
      "Lower Tippecanoe",
      "Lower White Caps",
      "No Grit",
      "Oblivion",
      "Old Tecumseh",
      "Palmers Way",
      "Periphery",
      "Higher Ground",
      "Sidewinder",
      "Siegel Street",
      "Sun Run",
      "Tangent",
    ],
    "waterville_open": [
      "White Peak Express Quad",
      "Valley Run Quad ",
      "Pasture J-Bar",
      "World Cup T-Bar",
      "Lower Meadows Double Chair",
      "Boneyard",
      "Lower Bobby's Run",
      "Psyched ",
      "Kinderpark Lift**For lessons only, closed to the public.\n",
      "Leroy's Loop",
      "Revelation",
      "Stemtation",
      "Valley Run",
      "Main Street",
      "Ruthies Run",
      "The Pasture",
      "Baseway",
      "Kinder Park",
      "Scramble",
      "Lower Stillness",
      "Rock Island",
      "Stillness",
      "And Tyler Too",
      "Bail Out",
      "Grimes Way",
      "Terrys Trail",
      "Tippecanoe",
      "Tree Line",
      "Psyched",
      "Sel's Choice",
      "The Chute",
      "Tommy's World Cup Run",
      "True Grit",
      "Utter Abandon",
      "Exhibition",
      "WV Progression Park",
      "Exhibition",
      "South Street"
    ]
};


$(function(){
  $("#ski_area_map").load("maps/Waterville.map");
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

  $('.map').maphilight();
});

// Change all the highlighting to yellow.
function color_yellow() {

  // This goes through and changes all the maphilight data "fillColor" properties
  // to "FFEA1C" which is the same yellow color I set as "default" for all areas.
  $("area").each(function(){
    console.log("CHANGING COLORS to YELLOW");
    $(this).data('maphilight', {"fillColor":"FFEA1C"});
  });

  $('.map').maphilight();   // Must call this to update the map!

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

  $('.map').maphilight();   // Must call this to update the map!

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

  $('.map').maphilight();   // Must call this to update the map!

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

  $('.map').maphilight();   // Must call this to update the map!

  return true;
}


// Update map function.
// Given a JSON file name, it will update the waterville valley page.
function update_map(filename) {
    console.log(filename);

    // List of trails open / closed.
    var open_trails = filename.waterville_open;
    var closed_trails = filename.waterville_closed;

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

    $('.map').maphilight();   // Must call this to update the map!
}


// Update the sidebar with a list of trails based on filename given.
function update_sidebar(filename) {
  // Empty IDs
  $( "#open_trails" ).empty();
  $( "#closed_trails" ).empty();

  // Add open trails.
  for(var open in filename.waterville_open) {
    console.log("open is: " + filename.waterville_open[open])
    $("#open_trails").append("<div>" + filename.waterville_open[open] + "</div>");
  }

  // Add closed trails.
  for(var closed in filename.waterville_closed) {
    console.log("closed is: " + filename.waterville_closed[closed])
    $("#closed_trails").append("<div>" + filename.waterville_closed[closed] + "</div>");
  }
}


// This will be a demo function to change the map we have working,
// with fake data.
function change_day(date) {
  // Change date based on input.
  if(date == "nov15") {
    update_map(nov15_json);
    update_sidebar(nov15_json);

    return true;
  }

  if(date == "dec15") {
    update_map(dec15_json);
    update_sidebar(dec15_json);

    return true;
  }

  if(date == "jan15") {
    update_map(jan15_json);
    update_sidebar(jan15_json);

    return true;
  }

  if(date == "feb15") {
    update_map(feb15_json);
    update_sidebar(feb15_json);

    return true;
  }

  if(date == "mar15") {
    update_map(mar15_json);
    update_sidebar(mar15_json);

    return true;
  }

  if(date == "apr15") {
    update_map(apr15_json);
    update_sidebar(apr15_json);

    return true;
  }

  if(date == "may15") {
    update_map(nov15_json);   // Nov15 because all closed.
    update_sidebar(nov15_json);

    return true;
  }

  else {
    console.log("Error, given invalid date.\n");
  }
}
