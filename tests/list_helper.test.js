const list_helper = require("../utils/list_helper.cjs")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]

describe("author with most blogs", () => {
  test("from empty list is null", () => {
    expect(list_helper.most_blogs([])).toEqual({
      author: undefined,
      blogs: 0,
    })
  })

  test("from list with one blog it is the corresponding author", () => {
    expect(list_helper.most_blogs(blogs.slice(0, 1))).toEqual({
      author: blogs[0].author,
      blogs: 1,
    })
  })

  test("from list with many blogs compute the author with most blogs", () => {
    expect(list_helper.most_blogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    })
  })
})

describe("author with most likes", () => {
  test("from empty list is null", () => {
    expect(list_helper.most_likes([])).toEqual({
      author: undefined,
      likes: 0,
    })
  })

  test("from list with one blog it is the corresponding author", () => {
    expect(list_helper.most_likes(blogs.slice(0, 1))).toEqual({
      author: blogs[0].author,
      likes: blogs[0].likes,
    })
  })

  test("from list with many blogs compute the author with most likes", () => {
    expect(list_helper.most_likes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})

describe("favorite blog", () => {
  test("from empty list is null", () => {
    expect(list_helper.favorite_blog([])).toBe(null)
  })

  test("from list with one blog it is the favorite one", () => {
    expect(list_helper.favorite_blog(blogs.slice(0, 1))).toEqual(blogs[0])
  })

  test("from list with many blogs to choose the one with most likes", () => {
    expect(list_helper.favorite_blog(blogs)).toEqual(blogs[2])
  })
})

describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(list_helper.total_likes([])).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    expect(list_helper.total_likes(blogs.slice(1, 2))).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    expect(list_helper.total_likes(blogs)).toBe(36)
  })
})

describe("list_helper", () => {
  test("dummy always return 1", () => {
    expect(list_helper.dummy()).toBe(1)
  })
})
