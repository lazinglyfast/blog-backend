const Blog = require("../models/blog.cjs")
const User = require("../models/user.cjs")
const supertest = require("supertest")
const api = supertest(require("../app.cjs"))
const helper = require("./test_helper.cjs")
const mongoose = require("mongoose")

const logUserReturnToken = async (i) => {
  const user = helper.users[i]
  const login = await api.post("/api/login").send(user)
  return login.body.token
}

beforeEach(async () => {
  await User.deleteMany({})
  await Promise.all(helper.users.map((u) => api.post("/api/users").send(u)))
  const users = await helper.usersInDb()

  await Blog.deleteMany({})

  // associate first blog with first user
  const blog = await new Blog({
    ...helper.blogs[0],
    creator: users[0]._id,
  }).save()
  users[0].blogs = users[0].blogs.concat(blog._id)
  await users[0].save()

  // associate other blogs with second user
  const blogs = await Promise.all(
    helper.blogs.slice(1).map(async (blog) => {
      return await new Blog({ ...blog, creator: users[1]._id }).save()
    }),
  )

  users[1].blogs = blogs.map((b) => b._id)
  await users[1].save()
})

describe("querying many blogs", () => {
  test("returns all blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body).toHaveLength(helper.blogs.length)
  })
})

describe("creation of a blog entry", () => {
  test("fails if user is not authenticated", async () => {
    const newBlog = {
      title: "Fighting patterns",
      author: "Jackie Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api.post("/api/blogs").send(newBlog).expect(401)
  })

  test("can insert a blog with an authenticated user", async () => {
    const newBlog = {
      title: "Fighting patterns",
      author: "Jackie Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api
      .post("/api/blogs")
      .set("authorization", await logUserReturnToken(0))
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.blogs.length + 1)
    const titles = response.body.map((b) => b.title)
    expect(titles).toContain(newBlog.title)
  })
})

describe("validation", () => {
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
      .set("authorization", await logUserReturnToken(0))
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test("if title is missing returns 400", async () => {
    const newBlog = {
      author: "missing title",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api
      .post("/api/blogs")
      .set("authorization", await logUserReturnToken(0))
      .send(newBlog)
      .expect(400)
  })

  test("if url is missing returns 400", async () => {
    const newBlog = {
      author: "missing url",
      likes: 7,
    }

    await api
      .post("/api/blogs")
      .set("authorization", await logUserReturnToken(0))
      .send(newBlog)
      .expect(400)
  })
})

describe("deletion", () => {
  test("blog can be deleted by creator", async () => {
    const responseBefore = await api.get("/api/blogs")

    const blogsBefore = responseBefore.body
    const blogToDelete = blogsBefore[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", await logUserReturnToken(0))
      .expect(204)

    const responseAfter = await api.get("/api/blogs")
    const blogsAfter = responseAfter.body
    expect(blogsAfter).toHaveLength(blogsBefore.length - 1)

    const ids = blogsAfter.map((b) => b.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe("update", () => {
  test("blog can be updated", async () => {
    const before = await api.get("/api/blogs")
    const blog = before.body[0]
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    }
    await api.put("/api/blogs").send(blogToUpdate)

    const after = await api.get(`/api/blogs/${blogToUpdate.id}`)
    const updatedBlog = after.body
    expect(updatedBlog.likes).toBe(blog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
