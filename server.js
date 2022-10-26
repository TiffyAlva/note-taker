const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express ()
const db = require("./db/db.json")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"./db/db.json"))
})

app.post("/api/notes", (req, res) => {
const data = req.body 
console.log(data)
db.push(data)
fs.writeFile("./db/db.json", JSON.stringify(db), () => {
    res.sendFile(path.join(__dirname,"./db/db.json"))
})
    
})

//local host
const PORT = process.env.PORT || 3001

//after node server.js commands
app.listen(PORT, () => {
    console.log("server is running")
})