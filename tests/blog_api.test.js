const Blog = require("../models/blog.cjs")
const supertest = require("supertest")
const api = supertest(require("../app.cjs"))
const helper = require("./test_helper.cjs")
const mongoose = require("mongoose")

describe("blog api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
  })

  test("returns all blogs", async () => {
    const response = await api.get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test("can insert a blog", async () => {
    const newBlog = {
      title: "Fighting patterns",
      author: "Jackie Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api.post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.blogs.length + 1)
    const titles = response.body.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test("returned blog has id instead of _id", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })

  test("if likes is not provided then it defaults to 0", async () => {
    const newBlog = {
      title: "React patterns",
      author: "Jackie Chan",
      url: "https://reactpatterns.com/",
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
