// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.4430,34.0691], // Starting position [lng, lat]
    zoom: 14 // Starting zoom level
});

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

const btn = document.querySelector("button");
let fun = false;

btn.addEventListener("click", () => {
    fun = true;
});

function addMarker(lat,lng,title,message,off){
    let popup_message = `<h2>${title}</h2> <p>${message}</p>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup({ offset: off })
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
        })
        if (fun) {
            const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
            document.body.style.backgroundColor = rndCol;
        }
    })
    document.getElementById("contents").appendChild(newButton);
}

addMarker(34.0606, -118.4486, 'House of Mandi', '1083 Gayley Ave, Los Angeles, CA 90024 <br>  Would highly recommend the lamb mandi, mushakal forn vegetables, and cheese sambusas.', 10);
addMarker(34.0626, -118.4476, 'XiBei Eatery', '10965 Weyburn Ave, Los Angeles, CA 90024 <br>  Chinese restaurant with authentic Chinese food. Recommend the noodle soups both for value and flavor!', 10);
addMarker(34.0638, -118.4473, 'The Spot Street Pupusas', '911 Broxton Ave, Los Angeles, CA 90024 <br>  Get everything.. tried the bean and cheese / spinach and cheese so far and they were all great', 10);