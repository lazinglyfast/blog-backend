const dummy = (_blogs) => {
  return 1
}

const total_likes = (blogs) => blogs.reduce((acc, b) => acc + b.likes, 0)

module.exports = {
  dummy,
  total_likes,
}
