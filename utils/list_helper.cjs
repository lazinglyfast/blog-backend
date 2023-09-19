const dummy = (_blogs) => {
  return 1
}

const total_likes = (blogs) => blogs.reduce((acc, b) => acc + b.likes, 0)

const favorite_blog = (blogs) => blogs.reduce((fav, b) => fav && fav.likes > b.likes ? fav : b, null)

const most_blogs = (blogs_list) => {
  const { author, stat } = most(blogs_list, () => 1)
  return { author, blogs: stat }
}

const most_likes = (blogs_list) => {
  const { author, stat } = most(blogs_list, b => b.likes)
  return { author, likes: stat }
}

const most = (blogs, fn) => {
  const map = new Map();

  blogs.forEach(b => {
    const value = (map.get(b.author) || 0) + fn(b)
    map.set(b.author, value)
  })

  const init = {
    author: undefined,
    stat: 0,
  }

  return Array.from(map)
    .map(([author, stat]) => {
      return { author, stat } // cannot shorthand this
    }).reduce((max, b) => (max && max.stat) > b.stat ? max : b, init)
}

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
  most_blogs,
  most_likes,
}
