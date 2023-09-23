const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
})

blogSchema.set("toJSON", {
  transform: (obj, updatedObj) => {
    updatedObj.id = obj.id
    delete updatedObj._id
    delete updatedObj.__v
    // this hack is unnecessary if we pass creator._id instead of creator to a new blog
    // updatedObj.creator = obj.creator
    // if (updatedObj.creator) {
    //   delete updatedObj.creator.blogs
    // }
  }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
