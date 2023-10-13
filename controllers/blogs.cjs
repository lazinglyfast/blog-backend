const express = require("express")
const Blog = require("../models/blog.cjs")
const jwt = require("jsonwebtoken")

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
  jwt.verify(req.token, process.env.SECRET)
  // realized the below gets handled by the errorHandler middleware
  // const validToken = token && jwt.verify(token, process.env.SECRET)
  // if (!validToken) {
  //   // these http code constants should be behind an enum
  //   return res.status(401).json({ error: "invalid token" })
  // }
  // replaced by middleware
  // const username = jwt.decode(req.token, process.env.SECRET)
  // const creator = await User.findOne({ username })
  const body = req.body
  const blogToSave = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    creator: req.user._id,
  }

  if (!blogToSave.title || !blogToSave.url) {
    return res.status(400).end()
  }
  const savedBlog = await new Blog(blogToSave).save()
  savedBlog.populate("creator")
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    const message = "blog does not exist"
    return res.status(404).json({ error: message })
  }

  if (blog.creator.toString() !== req.user.id.toString()) {
    const message = "logged in user does not have permission to delete resource"
    return res.status(401).json({ error: message })
  }
  await Blog.deleteOne(blog)
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
  const updatedBlog = await Blog.findByIdAndUpdate(body.id, blogToUpdate, {
    new: true,
  })
  res.json(updatedBlog)
})

module.exports = blogRouter
