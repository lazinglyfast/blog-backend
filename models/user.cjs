const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
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
