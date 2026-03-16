const jwt = require('jsonwebtoken')

const User = require('../models/user')

const AuthMiddleware = async (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: 'Authorization Failure!'
      })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        message: "Authorization Failure!"
      })
    }

    const decoded = jwt.verify(token, jwtSecret)

    const user = await User.findById(decoded.id).select('-password')

    if (!user || user.token !== token) {
      return res.status(401).json({
        success: false,
        message: "Authorization Failure!"
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Authorization failure: ${err.message}`
    })
  }
}

module.exports = AuthMiddleware