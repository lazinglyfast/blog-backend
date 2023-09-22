const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
})

schema.set("toJSON", {
  transform: (document, returnedUser) => {
    returnedUser.id = document._id
    delete returnedUser._id
    delete returnedUser.__v
    delete returnedUser.passwordHash
  }
})

const User = mongoose.model("User", schema)

module.exports = User
