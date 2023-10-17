const express = require("express")
const Blog = require("../models/blog.cjs")
const Comment = require("../models/comment.cjs")

const commentRouter = express.Router()

commentRouter.get("/", async (_req, res) => {
  const comments = await Comment.find({}).populate("blog", "title author")
  res.json(comments)
})

commentRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id).populate("blog", "title author")
  res.json(blog)
})

commentRouter.post("/", async (req, res) => {
  const commentToSave = {
    content: req.body.content,
    blog: req.body.blog,
  }

  if (!commentToSave.content || !commentToSave.blog) {
    return res.status(400).end()
  }
  const savedComment = await new Comment(commentToSave).save()
  const blog = await Blog.findById(savedComment.blog)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  savedComment.blog = blog
  res.status(201).json(savedComment)
})

module.exports = commentRouter
