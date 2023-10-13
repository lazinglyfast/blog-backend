const resetRouter = require("express").Router()
const Blog = require("../models/blog.cjs")
const User = require("../models/user.cjs")

resetRouter.post("/", async (_req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.status(201).end()
})

module.exports = resetRouter
