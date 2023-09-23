const express = require("express")
const Blog = require("../models/blog.cjs")
const User = require("../models/user.cjs")

const blogRouter = express.Router()

blogRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({}).populate("creator", "name username")
  res.json(blogs)
})

blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id).populate("creator", "name username")
  res.json(blog)
})

blogRouter.post("/", async (req, res) => {
  const users = await User.find({})
  const creator = users[0]
  const body = req.body
  const blogToSave = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    creator: creator._id,
  }

  if (!blogToSave.title || !blogToSave.url) {
    return res.status(400).end()
  }
  const savedBlog = await new Blog(blogToSave).save()
  creator.blogs = creator.blogs.concat(savedBlog._id)
  await creator.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogRouter.put("/", async (req, res) => {
  const body = req.body
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(body.id, blogToUpdate)
  res.json(updatedBlog)
})

module.exports = blogRouter
