const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()


// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI

console.log(MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error))


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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))