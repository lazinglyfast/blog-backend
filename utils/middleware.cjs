const errorHandler = (error, _req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { errorHandler }
