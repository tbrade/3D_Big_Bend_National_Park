mapboxgl.accessToken = 'pk.eyJ1IjoidGJyYWRlIiwiYSI6ImNreTEwZHA4YjA2ZmkydXNjcmVyMmtsYWQifQ.-aWTyT_0wb-D8yZuyZ2DyQ'
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/satellite-v9',
center: [-103.2502, 29.2498],
zoom: 9, // starting zoom
pitch: 85,
//bearing: 80,
});

map.on('load', () => {
  map.addSource('trails', {
    type: 'geojson',
    data: 'data/Big_Bend_National_Park_-_Trails.geojson'
  });

  map.addLayer({
    'id': 'trails-layer',
    'type': 'line',
    'source': 'trails',
    'paint': {
        'line-width': 3,
        'line-color': ['match', ['get', 'TRLCLASS'],
            'Class 1: Minimally Developed', 'red',
            'Class 2: Moderately Developed', 'orange',
            'Class 3: Developed', 'yellow',
            /*else,*/ 'blue'
        ]
    }
  });

  map.on('click', 'trails-layer', (e) => {
    const coordinates = e.lngLat;
      let feature = e.features[0].properties
    const description = "<b>Trail name:</b> " + feature.TRLNAME + "<br><b>Trail class:</b> " + feature.TRLCLASS + "<br><b>Trail length:</b> " + feature.Miles.toFixed(2) + " miles";

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
  });

  map.on('mouseenter', 'trails-layer', () => {
      map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'trails-layer', () => {
    map.getCanvas().style.cursor = '';
  });



map.addSource('bounds', {
  type: 'geojson',
  data: 'data/bibe_boundary_WGS_1984.geojson'
});

map.addLayer({
  'id': 'boundary-layer',
  'type': 'line',
  'source': 'bounds',
  'paint': {
    'line-width': 4,
    'line-color': 'black',
    'line-opacity': .6
  }
});

map.on('load', function () {
  map.addSource('mapbox-dem', {
      "type": "raster-dem",
      "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
      'tileSize': 512,
      'maxzoom': 14
  });
  map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});

  map.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 0.0],
              'sky-atmosphere-sun-intensity': 15
          }
  });

});

});
