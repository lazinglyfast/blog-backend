const express = require("express")
const Blog = require("../models/blog.cjs")

const blogRouter = express.Router()

blogRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const newBlog = { likes: 0, ...req.body }
  if (!newBlog.title || !newBlog.url) {
    return res.status(400).end()
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

module.exports = blogRouter
