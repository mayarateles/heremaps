/**
 * Adds a polyline between Dublin, London, Paris and Berlin to the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param {Element} resultContainer Reference to DOM Element to show the captured map area
 * @param {H.Map} map Reference to initialized map object
 * @param {H.ui.UI} ui Reference to UI component
 */

function capture(resultContainer, map, ui) {
  map.capture(
    function (canvas) {
      if (canvas) {
        resultContainer.innerHTML = "";
        resultContainer.appendChild(canvas);
      } else {
        // For example when map is in Panorama mode
        resultContainer.innerHTML = "Capturing is not supported";
      }
    },
    [ui],
    0,
    0,
    450,
    500
  );
}

function addPolylineToMap(map) {
  var points = [
    { lat: -22.9035, lng: -43.2096 },
    { lat: -20.3222, lng: -40.3381 },

    { lat: -23.5489, lng: -46.6388 },
  ];

  var lineString = new H.geo.LineString();
  points.forEach(function (point) {
    lineString.pushPoint(point);
  });

  map.addObject(new H.map.Polyline(lineString, { style: { lineWidth: 4 } }));
}

function capture2() {
  const captureElement = document.querySelector("#panel");
  html2canvas(captureElement)
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}

var platform = new H.service.Platform({
  apikey: "Neb0W6UApxk8T4iHYcdOTg",
});
var defaultLayers = platform.createDefaultLayers();
var mapContainer = document.getElementById("map");

//Step 2: initialize a map
var map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
  center: { lat: -22, lng: -43 },
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1,
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers, "en-US");

addPolylineToMap(map);

const btn = document.querySelector("#btn");
btn.addEventListener("click", capture2);

var resultContainer = document.getElementById("panel");

// Create container for the "Capture" button
var containerNode = document.createElement("div");
containerNode.className = "btn-group";

// Create the "Capture" button
var captureBtn = document.createElement("input");
captureBtn.value = "Snapshot";
captureBtn.type = "button";
captureBtn.className = "btn btn-sm btn-default";

// Add both button and container to the DOM
containerNode.appendChild(captureBtn);
mapContainer.appendChild(containerNode);

// Step 7: Handle capture button click event
captureBtn.onclick = function () {
  capture(resultContainer, map, ui);
};
//  FUNCIONANDO 18:08!!!!!
