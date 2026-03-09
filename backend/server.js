const express = require("express")
const fs = require("fs")
const axios = require("axios")

const app = express()

const API_KEY = "xHYk3xkzySHkbBzcxjHJ6kAIw41BiqlP"

let devices = []

if(fs.existsSync("devices.json")){
devices = JSON.parse(fs.readFileSync("devices.json"))
}

app.get("/devices",(req,res)=>{
res.json(devices)
})

async function buscarShodan(){

try{

const url =
`https://api.shodan.io/shodan/host/search?key=${API_KEY}&query=webcam`

const response = await axios.get(url)

response.data.matches.forEach(d=>{

if(d.location){

const device = {

ip:d.ip_str,
org:d.org || "Unknown",
port:d.port,
lat:d.location.latitude,
lon:d.location.longitude

}

const exists = devices.find(x=>x.ip === device.ip)

if(!exists){

devices.push(device)

}

}

})

fs.writeFileSync(
"devices.json",
JSON.stringify(devices,null,2)
)

}catch(err){

console.log("erro",err.message)

}

}

setInterval(buscarShodan,60000)

app.listen(3000,()=>{
console.log("Servidor rodando")
})
