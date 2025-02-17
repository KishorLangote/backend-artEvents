const mongoose = require("mongoose");

const artEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true
     },

    eventType: {
      type: String,
      enum: ["Exhibition", "Workshop", "Live Performance", "Cultural Exhibition", "Permanent Exhibition", "Sculpture & Digital Art", "Multimedia Exhibition", "Historical Exhibition", "Contemporary Exhibition", "Permanent Collection"],
    },

    continent: { 
      type: String 
    },

    country: {
       type: String
      },

    city: { 
      type: String 
    },

    eventImageUrl: { 
      type: String 
    },

    host: [{ 
      type: String,
      enum: ["Artist", "Writer", "Poet", "Curator","Art Historian", "Museum Director", "Art Restorer", "Gallery Owner", "Art Collector", "Senior Curator", "Art Critic", "Archaeologist", "Cultural Historian", "Art Conservator", "Guest Artist", "Cultural Expert", "Historian", "Renowned Sculptor", "Digital Artist", "Art Therapist", "Chief Curator", "Architect", "Modern Art Expert", "American Art Curator", "Museum Educator", "Art Curator"] 
      }],
    
    hostBy: [{
      type: String,
    }],

    hostImageUrl: {
       type: String 
      },

    descriptions: { 
      type: String
     },

    artGalleryName: {
       type: String 
      },

    startEvent: {
       type: String
       },

    endEvent: { 
      type: String
     },

    address: { 
      type: String 
    },

    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    },

    googleMapImageUrl: { 
      type: String
     },

    entryFee: { 
      type: String 
    },

    artistCount: {
       type: Number 
      },

    maxCapacity: { 
      type: Number
     },

    ticketsAvailable: { 
      type: Boolean,
       default: true 
      },

    contactInfo: {
      email: { type: String },
      phone: { type: String },
    },

    sponsors: [{ 
      type: String 
    }],

    featuredArtists: [
      {
        name: { type: String },
        imageUrl: { type: String },
        bio: { type: String },
        artWorkImageUrl: [
          {
            imageUrl:{ type: String },
            title: { type: String }
          } 
        ],
      },
    ],
      

    tags: [{ 
      type: String,
      enum: ["Modern Art", "Painting", "Sculpture", "Ceramics", "Photography", "Realism", "Impressionism", "Surrealism", "Cubism", "Abstract Expressionism", "Pop Art", "Classic Art", "Renaissance", "Middle Eastern Art", "Contemporary", "Cultural Fusion", "Latin Art", "Modernism", "Modern Indian Art", "Biennale", "Kala Ghoda", "Deccan Art", "Historical Artifacts", "Textile Arts", "Colonial Art", "Indian Renaissance", "Indian Art", "Culture", "History", "Goan Art", "Post-Impressionism", "Dutch Masters", "Digital Art", "French Art", "20th Century Art", "New York", "Modern Architecture", "American Gothic", "Real Illusion", "Abstract", "Cubism", "Regionalism", "Sketch", "Cartoon", "Contemporary Art"]
    }],

    officialWebsite: { 
      type: String 
    },
  },
  { timestamps: true }
);

const ArtEvents = mongoose.model("ArtEvent", artEventSchema);

module.exports = ArtEvents;
