const User = require("../models/user.cjs")
const jwt = require("jsonwebtoken")

const errorHandler = (error, _req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, _res, next) => {
  req.token = req.headers["authorization"]
  next()
}

const userExtractor = async (req, res, next) => {
  const username = jwt.decode(req.token, process.env.SECRET)
  if (!username) {
    const message = "invalid access token"
    return res.status(401).json({ error: message })
  }
  req.user = await User.findOne({ username })
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
