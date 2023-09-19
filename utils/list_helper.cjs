const dummy = (_blogs) => {
  return 1
}

const total_likes = (blogs) => blogs.reduce((acc, b) => acc + b.likes, 0)

const favorite_blog = (blogs) => blogs.reduce((fav, b) => fav && fav.likes > b.likes ? fav : b, null)

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
}
