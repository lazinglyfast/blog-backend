const express = require("express")
const Blog = require("../models/blog.cjs")

const blogRouter = express.Router()

blogRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const newBlog = { likes: 0, ...req.body }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogRouter
