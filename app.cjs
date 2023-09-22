const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogs.cjs")
const userRouter = require("./controllers/users.cjs")
require("dotenv").config()

let uri = process.env.TEST_MONGODB_URI
if (process.NODE_ENV == "prod") {
  uri = process.env.MONGODB_URI
}
mongoose.connect(uri)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)

module.exports = app
