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

function addMarker(feature){/*,col){*/
    if (data['Vegetarian'] == "Yes") {
        let col = "green";
        let popup_message = `<h2>${feature['name']}</h2> <p>${feature['address']} <br> Vegetarian Friendly! </p>`;
    } else {
        let col = "red";
        let popup_message = `<h2>${feature['name']}</h2> <p>${feature['address']} <br> Not Vegetarian Friendly.</p>`;
    }
    new maplibregl.Marker({color: col})
        .setLngLat([feature['lng'], feature['lat']])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(feature['lat'],feature['lng'],feature['name']);
    return popup_message;
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
        /*let coordinates = feature.geometry.coordinates;*/
        let longitude = feature['lng'];
        let latitude = feature['lat'];
        let title = feature['name'];
        let message = feature['address'];
        /*let color = feature.properties.color;*/
        addMarker(feature);/*,color);*/
    })
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSW5R1J6LXtPgbwbiHmf6eOBzVGM1mfEu9xITAIEuHSH3wXrHHoDLZM9cxxLz4x9zOWBx7m_QeeLjnD/pub?output=csv"

map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: results =>{
            processData(results.data) // Call processData with the fetched data
        }
    });
});