const express = require("express")
require("dotenv").config()
const app = express()

const cors = require("cors") // handle cross origin request..
const corsOptions = {
  origin: "*",              // this allows request from any origin
  credentials: true,        // this allows cookies, authorization headers, TLS certi..
  optionSuccessStatus: 200, // set status code 200 fir successful request..
}

app.use(cors(corsOptions))  // this is cors middleware, allowing the browser to make cross origin request to the server..


const { initializeDatabase} = require("./db/db.connect")
const artEvents = require("./models/artEvents.models")

app.use(express.json()) // middleware..

initializeDatabase() // call the function..

app.get("/", (req, res) => {
  res.send("Hello, express server!!")
})


async function createArtEvent(newArtEvent){
  try{
    const events = new artEvents(newArtEvent) // create new event
    const savedEvents = await events.save()  // save event
    return savedEvents;
  } catch(error) {
    throw error;
  }
}


// to create new art events entry in db via postman using POST method: 

app.post("/artEvents", async (req, res) => {
  try{
    const saveArtEvent = await createArtEvent(req.body)
    res.status(201).json({ message: "Art event added successfully.", artEvent: saveArtEvent})
  } catch(error) {
    res.status(500).json({ error: "Failed to add art event."})
  }
})


// to get all art event database: 

async function readAllArtEvents(){
  try{
    const allArtEvents = artEvents.find()
    return allArtEvents;
  }catch(error){
    throw error;
  }
}

app.get("/artEvents", async (req, res) => {
  try{
    const artEvents = await readAllArtEvents()
    if(artEvents.length > 0){
      res.json(artEvents)
    } else {
      res.status(404).json({ error: "No art event found."})
    }
  }catch(error){
    res.status(500).json({ error: "Failed to fetch art events data."})
  }
})

// art event read by id:

async function readArtEventById(artEventId){
  try{
    const artEventById = await artEvents.findById(artEventId)
    return artEventById
  }catch(error){
    throw error;
  }
}


app.get("/artEvents/:artEventId", async (req, res) => {
  try{
    const artEvents = await readArtEventById(req.params.artEventId)
    if(artEvents){
      res.json(artEvents)
    } else {
      res.status(404).json({ error: "Art event not found."})
    }
  }catch(error){
    res.status(500).json({ error: "Failed to fetch art event data."})
  }
})


//  APIs route for read art event by title: 

async function readArtEventByTitle(artEventTitle){
  try{
    const artEventByTitle = await artEvents.find({ title: artEventTitle })
    return artEventByTitle;
  }catch(error){
    throw error;
  }
}

app.get("/artEvents/title/:artEventTitle", async (req, res) => {
  try{
    const artEvents = await readArtEventByTitle(req.params.artEventTitle)
    if(artEvents){
      res.json(artEvents)
    } else {
      res.status(404).json({ error: "Not found art event."})
    }
  }catch(error){
    res.status(500).json({ error: "Failed to fetch art event data."})
  }
})


// APIs route to read art event by tags..

async function readArtEventByTags(artEventTag){
  try{
    const artEventByTag = await artEvents.findOne({tags: artEventTag })
    return artEventByTag;
  }catch(error){
    throw error;
  }
}

app.get("/artEvents/tag/:artEventTag", async (req, res) => {
  try {
    const artEvents = await readArtEventByTags(req.params.artEventTag)
    if(artEvents){
      res.json(artEvents)
    } else {
      res.status(404).json({ error: "No art event found."})
    }
  } catch(error){
    res.status(500),json({ error: "Failed to fetch art event data."})
  }
})


// get the art work by artist name:

async function readArtWorkByName(artistName){
  try{
    const artistName = await artEvents.findOne({name: artistName})
    console.log(artistName)
    return artistName;
  }catch(error){
    throw error;
  }
}


app.get("/artEvents/artist/:artistName", async (req, res) => {
  try {
    const artist = await readArtWorkByName(req.params.artistName)
    if(artist){
      res.json(artist)
    } else {
      res.status(404).json({ message: "Artist not found."})
    }
  } catch(error){
    res.status(500).json({ error: "Failed to fetch data."})
  }
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`)
})