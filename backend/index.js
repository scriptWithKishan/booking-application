const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()


// MongoDB connection
const mongoUrl = process.env.MONGODB_URI
if (!mongoUrl) {
  throw new Error("Missing MONGODB_URI environment variable")
}

// Routes

const AuthRouter = require('./routes/auth-router')

app.use('/auth', AuthRouter)

app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found"
  })
})


// Running the server
const PORT = process.env.PORT || 3000

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((error) => {
    console.log("MongoDB connection Error", error.message)
    process.exit(1)
  })
