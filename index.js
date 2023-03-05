const express = require("express")
const app = express()
const fetch = require("node-fetch")

app.set('view engine', 'ejs');

app.listen(80, () => {
    console.log("Started Successfuly | Made By ItzCrazyKns")
})


app.get('/', async (req,res) => {
    res.render("index")
})

app.get('/api/status/java', async (req,res) => {
    if(!req.query.serverip) return res.send("Invalid Server Id Or Port")
    if(!req.query.port) req.query.port = 25565
    let status = {}
    if(req.query.port == 25565) {
        await fetch("https://api.mcsrvstat.us/2/" + req.query.serverip)
        .then(response => response.json())
        .then(json => {
            if(json.online == true) {
            status.ip = json.ip 
            status.port = json.port
            status.online = json.online
            status.current = json.players.online
            status.max = json.players.max
            status.version = json.version
            } else {
            status.ip = 'Offline' 
            status.port = 'Offline' 
            status.online = false 
            status.current = 'Offline' 
            status.max = 'Offline' 
            status.version = 'Offline' 
            }
        })
    } else {
        await fetch("https://api.mcsrvstat.us/2/" + req.query.serverip + ":" + req.query.port)
        .then(response => response.json())
        .then(json => {
            if(json.online == true) {
            status.ip = json.ip 
            status.port = json.port
            status.online = json.online
            status.current = json.players.online
            status.max = json.players.max
            status.version = json.version
            } else {
            status.ip = 'Offline' 
            status.port = 'Offline' 
            status.online = false
            status.current = 'Offline' 
            status.max = 'Offline' 
            status.version = 'Offline' 
            }
        })
    }

    res.send(status)
})