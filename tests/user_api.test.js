// const express = require("express")
const supertest = require("supertest")
require("express-async-errors")
const api = supertest(require("../app.cjs"))
const User = require("../models/user.cjs")
const helper = require("./test_helper.cjs")
const mongoose = require("mongoose")

beforeEach(async () => {
  await User.deleteMany({})
  await Promise.all(helper.users.map(u => api.post("/api/users").send(u)))
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("user creation", () => {
  test("creating invalid user fails with correct status code", async () => {
    const usersBefore = await helper.usersInDb()
    const missingUsername = {
      password: "bear"
    }

    await api
      .post("/api/users")
      .send(missingUsername)
      .expect(400)

    const missingPassword = {
      username: "coala"
    }

    await api
      .post("/api/users")
      .send(missingPassword)
      .expect(400)

    const usernameTooShort = {
      username: "co",
      password: "bear"
    }

    await api
      .post("/api/users")
      .send(usernameTooShort)
      .expect(400)

    const passwordTooShort = {
      username: "coala",
      password: "be"
    }

    await api
      .post("/api/users")
      .send(passwordTooShort)
      .expect(400)

    const usernameExists = {
      username: "coala",
      password: "bear"
    }

    await api
      .post("/api/users")
      .send(usernameExists)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersBefore).toEqual(usersAfter)
  })
})
