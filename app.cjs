const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config.cjs")
const blogRouter = require("./controllers/blogRoutes.cjs")

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)

module.exports = app
