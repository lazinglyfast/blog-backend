const app = require("./app.cjs")
const logger = require("./utils/logger.cjs")

app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})
