// Initialize the map

let mapOptions = {'centerLngLat': [-118.4430,34.0691],'startingZoomLevel':13}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

const btn = document.querySelector("button");
let fun = false;

btn.addEventListener("click", () => {
    fun = true;
});

function addMarker(lat,lng,title,message,col){
    let popup_message = `<h2>${title}</h2> <p>${message}</p>`
    new maplibregl.Marker({color: col})
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 16
        })
        if (fun) {
            const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
            document.body.style.backgroundColor = rndCol;
        }
    })
    document.getElementById("contents").appendChild(newButton);
}

function processData(data) {
    console.log(data);
    data.features.forEach(feature => {
        let coordinates = feature.geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];
        let title = feature.properties.place;
        let message = feature.properties.message;
        let color = feature.properties.color;
        addMarker(latitude,longitude,title,message,color);
    })
}

map.on('load', function() {
    fetch("places.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        });
});