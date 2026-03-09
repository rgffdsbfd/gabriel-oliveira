
var map = L.map('map').setView([-20.5386,-47.4009],6)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map)

var dispositivos = JSON.parse(localStorage.getItem("dispositivos")) || []

function desenhar(){

dispositivos.forEach(d=>{

var marker = L.marker([d.lat,d.lon]).addTo(map)

marker.bindPopup(
"IP: "+d.ip+
"<br>Produto: "+d.produto+
"<br>País: "+d.pais
)

})

}

desenhar()

function buscar(){

var query = document.getElementById("busca").value

fetch("https://api.shodan.io/shodan/host/search?key=xHYk3xkzySHkbBzcxjHJ6kAIw41BiqlP&q="+query)

.then(res=>res.json())

.then(data=>{

data.matches.forEach(d=>{

if(!d.location) return

var existe = dispositivos.find(x=>x.ip==d.ip_str)

if(!existe){

var novo = {

ip:d.ip_str,
produto:d.product || "Desconhecido",
pais:d.location.country_name,
lat:d.location.latitude,
lon:d.location.longitude

}

dispositivos.push(novo)

}

})

localStorage.setItem("dispositivos",JSON.stringify(dispositivos))

location.reload()

})

}
