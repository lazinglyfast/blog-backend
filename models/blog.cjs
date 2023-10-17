const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
})

schema.set("toJSON", {
  transform: (obj, updatedObj) => {
    updatedObj.id = obj.id
    delete updatedObj._id
    delete updatedObj.__v
    // this hack is unnecessary if we pass creator._id instead of creator to a new blog
    // updatedObj.creator = obj.creator
    // if (updatedObj.creator) {
    //   delete updatedObj.creator.blogs
    // }
  },
})

const Blog = mongoose.model("Blog", schema)

module.exports = Blog
