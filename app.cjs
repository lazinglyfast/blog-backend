const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogs.cjs")
const userRouter = require("./controllers/users.cjs")
const loginRouter = require("./controllers/login.cjs")
const middleware = require("./utils/middleware.cjs")
require("dotenv").config()

let uri = process.env.MONGODB_URI
if (process.env.NODE_ENV == "test") {
  uri = process.env.TEST_MONGODB_URI
}
mongoose.connect(uri)

app.use(cors())
app.use(express.json())
// for now we only need it in /api/blogs
app.use("/api/blogs", middleware.tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)

module.exports = app
