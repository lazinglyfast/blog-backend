const _ = require("lodash")

const dummy = (_blogs) => {
  return 1
}

const total_likes = (blogs) => blogs.reduce((acc, b) => acc + b.likes, 0)

const favorite_blog = (blogs) =>
  blogs.reduce((fav, b) => (fav && fav.likes > b.likes ? fav : b), null)

const most_blogs = (blogs_list) => {
  const { author, stat } = most(blogs_list, () => 1)
  return { author, blogs: stat }
}

const most_likes = (blogs_list) => {
  const { author, stat } = most(blogs_list, (b) => b.likes)
  return { author, likes: stat }
}

const most = (blogs, fn) => {
  const hashmap = _.reduce(
    blogs,
    (acc, b) => {
      const value = (acc.get(b.author) || 0) + fn(b)
      return acc.set(b.author, value)
    },
    new Map(),
  )

  const init = {
    author: undefined,
    stat: 0,
  }

  const entries = _.map(Array.from(hashmap), ([author, stat]) => {
    return { author, stat } // cannot shorthand this
  })
  return _.reduce(
    entries,
    (max, b) => ((max && max.stat) > b.stat ? max : b),
    init,
  )
}

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
  most_blogs,
  most_likes,
}
