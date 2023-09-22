const userRouter = require("express").Router()
const User = require("../models/user.cjs")
const bcrypt = require("bcrypt")

userRouter.get("/", async (_req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const { name, username, password } = req.body
  const salt = 10
  const userToSave = {
    name: name,
    username: username,
    passwordHash: await bcrypt.hash(password, salt),
  }
  const savedUser = await new User(userToSave).save()
  res.json(savedUser)
})

module.exports = userRouter
