import express from "express"
import Blog from "../models/blog.js"

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

export default blogRouter
