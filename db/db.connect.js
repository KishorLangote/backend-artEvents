const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGODB

const initializeDatabase = async () => {
  await mongoose.connect(mongoUrl).then(() => {
    console.log("Database connected successfully.")
  })
  .catch((error) => {
    console.log("Error while connecting to the database.", error)
  })
  
}

module.exports = { initializeDatabase }


