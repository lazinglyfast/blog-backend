import express from "express"
const app = express()
import cors from "cors"
import * as mongoose from "mongoose"
import * as config from "./utils/config.js"
import blogRouter from "./controllers/blogRoutes.js"

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)

export default app
