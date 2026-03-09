const API_KEY = "xHYk3xkzySHkbBzcxjHJ6kAIw41BiqlP";

var map = L.map('map').setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

async function buscarShodan(){

const query = "webcam"; // exemplo

const url = `https://api.shodan.io/shodan/host/search?key=${API_KEY}&query=${query}`;

const res = await fetch(url);
const data = await res.json();

data.matches.forEach(device => {

if(device.location){

const lat = device.location.latitude;
const lon = device.location.longitude;

L.circleMarker([lat,lon],{
radius:4,
color:"red"
}).addTo(map);

}

});

}

buscarShodan();
