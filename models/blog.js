import * as mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set("toJSON", {
  transform: (obj, updatedObj) => {
    updatedObj.id = updatedObj._id
    delete updatedObj._id
    delete updatedObj.__v
  }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
