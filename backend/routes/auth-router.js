const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AuthMiddleware = require('../middleware/auth')

const User = require('../models/user')

const AuthRouter = express.Router()

AuthRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required!" })
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({
        message: "User already exist!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      password: hashedPassword
    })

    return res.status(200).json({
      message: "User created successfully"
    })
  } catch (err) {
    console.log("Server Error", err.message)
    return res.status(500).json({
      message: `Server Error!`
    })
  }
})

AuthRouter.post('/login', async (req, res) => {
  try {
    const jwtSecret = process.env.JWT_SECRET
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are requried!"
      })
    }

    const user = await User.findOne({ username }).select('+password')

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials!"
      })
    }

    if (user.token) {
      try {
        jwt.verify(user.token, jwtSecret)
        return res.status(400).json({
          message: "Already logged in! Logout from other device"
        })
      } catch {
        user.token = null
      }
    }

    const comparedPassword = await bcrypt.compare(password, user.password)

    if (!comparedPassword) {
      return res.status(401).json({
        message: "Invalid Credentials!"
      })
    }

    const token = await jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" })
    user.token = token
    await user.save()

    return res.status(200).json({
      message: "Logged in successfully!",
      token
    })
  } catch (err) {
    console.log("Server Error! ", err.message)
    return res.status(500).json({
      message: `Server Error!`
    })
  }
})

AuthRouter.post('/logout', AuthMiddleware, async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    user.token = null
    await user.save()

    return res.status(200).json({
      message: "Logged out successfully!"
    })
  } catch (err) {
    console.log("Server Error! ", err.message)
    return res.status(500).json({
      message: `Server Error!`
    })
  }
})

module.exports = AuthRouter