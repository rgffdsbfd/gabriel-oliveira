const API_KEY = "xHYk3xkzySHkbBzcxjHJ6kAIw41BiqlP"

var map = L.map('map').setView([-20.5386,-47.4009],6)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map)

var dispositivos = JSON.parse(localStorage.getItem("iot")) || []

function desenhar(){

dispositivos.forEach(d=>{

var marker=L.marker([d.lat,d.lon]).addTo(map)

marker.bindPopup(
"IP: "+d.ip+
"<br>Produto: "+d.produto+
"<br>País: "+d.pais
)

})

}

desenhar()

function buscar(){

var query=document.getElementById("busca").value

fetch(`https://api.shodan.io/shodan/host/search?key=${API_KEY}&q=${query}`)

.then(res=>res.json())

.then(data=>{

data.matches.forEach(device=>{

if(!device.location) return

var existe=dispositivos.find(x=>x.ip==device.ip_str)

if(!existe){

var novo={

ip:device.ip_str,
produto:device.product || "desconhecido",
pais:device.location.country_name,
lat:device.location.latitude,
lon:device.location.longitude

}

dispositivos.push(novo)

var marker=L.marker([novo.lat,novo.lon]).addTo(map)

marker.bindPopup(
"IP: "+novo.ip+
"<br>Produto: "+novo.produto+
"<br>País: "+novo.pais
)

}

})

localStorage.setItem("iot",JSON.stringify(dispositivos))

})

.catch(()=>{

alert("Erro ao buscar dispositivos")

})

}
