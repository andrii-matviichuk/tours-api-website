/* eslint-disable */

const dataset = JSON.parse(
  document.getElementById('map')
    ? document.getElementById('map').dataset.locations
    : ''
);

mapboxgl.accessToken = dataset.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/zacozaco27/ckjfixd8v5y9h19mmggnkkssq',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

dataset.locations.forEach((loc) => {
  const element = document.createElement('div');
  element.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
    .addTo(map);

  // Extend map bound to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
