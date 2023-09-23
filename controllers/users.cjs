const userRouter = require("express").Router()
const User = require("../models/user.cjs")
const bcrypt = require("bcrypt")

userRouter.get("/", async (_req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const { name, username, password } = req.body
  // not a big fan of two diff validation logics (the other being through mongoose)
  if (!password) {
    const message = "password is required"
    return res.status(400).json({ error: message })
  }

  if (password.length < 3) {
    // this should be defined in only one place
    const minLength = 3
    const message = `User validation failed: password: Path \`password\` is shorter than the minimum allowed length (${minLength}).`
    return res.status(400).json({ error: message })
  }

  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    const message = "username already exists"
    return res.status(400).json({ error: message })
  }

  const salt = 10
  const userToSave = {
    name: name,
    username: username,
    passwordHash: await bcrypt.hash(password, salt),
  }
  const savedUser = await new User(userToSave).save()
  res.status(201).json(savedUser)
})

module.exports = userRouter
