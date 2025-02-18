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


 // get artist by id 

 async function readArtistById(artistId){
    try{
      const artistById = artEvents.findById(artistId)
      return artistById;
    }catch (error) {
      throw error;
    }
 }

//  app.get("/artEvents/artists/:artistId/arts", async (req, res) => {
//     try{
//       const artists = await readArtistById(req.params.artistId)
//       if(artists){
//         res.json(artists)
//       } else {
//         res.status(404).json({ error: "Not found"})
//       }
//     } catch(error){
//       res.status(500).json({ error: "Failed to fetch events data."})
//     }
//  })

 // Example route for fetching artworks by artistId
app.get("/artists/:artistId/arts", async (req, res) => {
  const { artistId } = req.params;  // Extract artistId from the URL

  try {
    // Fetch the artworks for the artistId from the database
    const artworks = await artEvents.find({ artistId });

    if (!artworks.length) {
      return res.status(404).json({ message: "No artworks found for this artist." });
    }

    res.json(artworks);  // Send the artworks data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`)
})