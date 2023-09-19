const express = require("express")
const Blog = require("../models/blog.cjs")

const blogRouter = express.Router()

blogRouter.get("/", (_req, res) => {
  Blog.find({}).then(blogs => res.json(blogs))
})

blogRouter.post("/", (req, res) => {
  console.log(req.body) // coming empty, why?
  const blog = new Blog(req.body)
  blog.save().then(savedBlog => {
    res.status(201).json(savedBlog)
  })
})

module.exports = blogRouter
