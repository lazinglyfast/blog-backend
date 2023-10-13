const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
})

schema.set("toJSON", {
  transform: (document, returnedUser) => {
    returnedUser.id = document._id
    delete returnedUser._id
    delete returnedUser.__v
    delete returnedUser.passwordHash
  },
})

schema.plugin(uniqueValidator)
const User = mongoose.model("User", schema)

module.exports = User
