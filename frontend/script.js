const map = L.map("map").setView([20,0],2)

L.tileLayer(
"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
{
attribution:"© OpenStreetMap"
}
).addTo(map)

async function carregarDispositivos(){

const res = await fetch("http://localhost:3000/devices")

const devices = await res.json()

devices.forEach(d=>{

const marker = L.circleMarker(
[d.lat,d.lon],
{
radius:4,
color:"red",
fillColor:"red",
fillOpacity:1
}
).addTo(map)

marker.bindPopup(
`IP: ${d.ip}<br>
ORG: ${d.org}<br>
PORTA: ${d.port}`
)

})

}

carregarDispositivos()

setInterval(carregarDispositivos,30000)
