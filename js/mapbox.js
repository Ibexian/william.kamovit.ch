//Set up our custom linked GEOJSON
  function Marker(lat, long, url, symbol, title, id){
    this.geometry = {};
    this.properties = {};
    this.geometry.coordinates = [lat,long];
    this.geometry.type = 'Point';
    this.properties.id = id;
    this.properties['marker-color'] = '#505050';
    this.properties['marker-size'] = 'medium';
    this.properties['marker-symbol'] = symbol;
    this.properties.title = title;
    this.type = 'Feature';
}
var makemap = function (zoom) {
  var map = L.mapbox.map('map', 'wjkamovitch.map-hcqzgwpo', {detectRetina: true}).setView([43, 14.9], zoom);
        //disable map movement
        map.touchZoom.disable();
        map.dragging.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        // disable tap handler, if present.
        if (map.tap) map.tap.disable();
        //manually remove the zoom buttons
        $(".leaflet-bar").remove();
        $(".leaflet-right").remove();

      // Return the map 
      return map;        
};

// Given a screen size, return a zoom level for mapbox.
var adaptivezoom = function(size) {
  if(size <= 589) return 1;
  else if(size <= 1190) return 2;
  return 3;
};

function checkWidth() {
  var windowSize = $(window).width();

  //Change the zoom level of the initial map load based on screen size
  var zoom = adaptivezoom(windowSize);
  map = makemap(zoom);


  var NewOriental = new Marker(112.938814,28.228209,"NewOriental", 'commercial', 'New Oriental', '3togyyo6');
  var MediaMath = new Marker(-71.253956,42.376727,'MediaMath','commercial', 'Media Math', 'lnxos0eb');
  var NKIDP = new Marker(-77.029716,38.8953,'NKIDP','commercial', 'North Korean International Documentation Project', 'xzsjc9cn');
  var PKU = new Marker(116.305611,39.987755, 'PKU', 'college', 'Peking University', 'xu37qi6o');
  var GWU = new Marker(-77.046272,38.899798, 'GWU', 'college', 'George Washington University', '0l5qibch');
  var SOAS = new Marker(-0.12889623641967773,51.52204224896724, 'SOAS', 'college', 'School of Oriental and African Studies', 'xdtpyk00');
  var geoJson = {
      type: 'FeatureCollection',
      features: [NewOriental, MediaMath, NKIDP, PKU, GWU, SOAS]
      };
  // Make the GeoJSON linkable in the same window
  map.markerLayer.setGeoJSON(geoJson);
  map.markerLayer.on('click', function(e) {
    e.layer.unbindPopup();
    window.open(e.layer.feature.properties.url,'_self');
  });
  return map;
}
//Update zoom and recenter as window is resized
var newsize = function(map) {
  return function() {
      var windowSize = $(window).width();
      var zoomLevel = adaptivezoom(windowSize);
      map.setView([43, 14.9], zoomLevel);
  };    
};

var iss = function(map) {
  var myIcon = L.icon({
    iconUrl: '/img/rocket.png',
    iconSize: [30, 30]
  });
  var issMarker = L.marker([-20,-20], {icon: myIcon, title:"ISS"}).addTo(map);
  //now get the ISS Location
  setInterval(function(){
    $.ajax({
      url: "http://api.open-notify.org/iss-now.json",
      success: function(data) {
        issMarker.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
      },
      dataType: "jsonp"
    });
  }, 2000);


};                  

$(document).ready(function() {
    var map = checkWidth();
    iss(map);
    $(window).resize(newsize(map));
});
