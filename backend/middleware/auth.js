const jwt = require('jsonwebtoken')

const User = require('../models/user')

const AuthMiddleware = async (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET
    const authHeader = req.headers.authorization

    if (!jwtSecret) {
      return res.status(500).json({
        message: "Server misconfiguration"
      })
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: 'Authorization Failure!'
      })
    }

    const [, token] = authHeader.split(" ")

    if (!token) {
      return res.status(401).json({
        message: "Authorization Failure!"
      })
    }

    const decoded = jwt.verify(token, jwtSecret)

    const user = await User.findById(decoded.id).select('-password')

    if (!user || user.token !== token) {
      return res.status(401).json({
        message: "Authorization Failure!"
      })
    }

    req.user = user
    next()
  } catch (err) {
    console.log("Authorization Failure! ", err.message)
    return res.status(401).json({
      message: `Authorization Failure!`
    })
  }
}

module.exports = AuthMiddleware