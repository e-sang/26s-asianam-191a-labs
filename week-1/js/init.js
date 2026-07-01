// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
    center: [-118.4476, 34.0626], // starting position [lng, lat]
    zoom: 15 // starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-118.4486, 34.0606])
    .setPopup(new maplibregl.Popup({ offset: 10 })
        .setHTML('House of Mandi <br> 1083 Gayley Ave, Los Angeles, CA 90024 <br>  Would highly recommend the lamb mandi, mushakal forn vegetables, and cheese sambusas.'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.4476, 34.0626])
    .setPopup(new maplibregl.Popup({ offset: 10 })
        .setHTML('XiBei Eatery <br> 10965 Weyburn Ave, Los Angeles, CA 90024 <br>  Chinese restaurant with authentic Chinese food. Recommend the noodle soups both for value and flavor!'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.4473, 34.0638])
    .setPopup(new maplibregl.Popup({ offset: 10 })
        .setHTML('The Spot Street Pupusas <br> 911 Broxton Ave, Los Angeles, CA 90024 <br>  Get everything.. tried the bean and cheese / spinach and cheese so far and they were all great'))
    .addTo(map);

