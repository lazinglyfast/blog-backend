const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user.cjs")

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  const encrypted = await User.findOne({ username })
  const passwordMatches = await bcrypt.compare(password, encrypted.passwordHash)
  if (!passwordMatches) {
    return res.status(400).json({ error: "password does not match" })
  }
  // what should the payload be?
  // I realized that we'll need it later to get the user so username is correct
  const token = jwt.sign(username, process.env.SECRET)
  res.status(200).json({ token })
})

module.exports = loginRouter
