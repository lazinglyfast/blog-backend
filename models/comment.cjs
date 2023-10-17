const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
})

schema.set("toJSON", {
  transform: (obj, updatedObj) => {
    updatedObj.id = obj._id
    delete updatedObj._id
    delete updatedObj.__v
  },
})

const Comment = mongoose.model("Comment", schema)

module.exports = Comment
