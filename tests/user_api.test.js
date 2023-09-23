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

const testCreatingInvalidUser = async (invalidUser, message) => {
  const usersBefore = await helper.usersInDb()

  const response = await api
    .post("/api/users")
    .send(invalidUser)
    .expect(400)

  expect(response.body.error).toMatch(message)
  const usersAfter = await helper.usersInDb()

  expect(usersBefore).toEqual(usersAfter)
}

describe("user creation", () => {
  test("creating valid user works", async () => {
    const usersBefore = await helper.usersInDb()

    const validUser = {
      name: "lazy",
      username: "lazinglyfast",
      password: "bear",
    }

    await api
      .post("/api/users")
      .send(validUser)
      .expect(201)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(validUser.username)
  })

  test("missing username errors out with correct message and status code", async () => {
    const missingUsername = {
      password: "bear"
    }
    const message = /username.*required/
    await testCreatingInvalidUser(missingUsername, message)
  })

  test("missing password errors out with correct message and status code", async () => {
    const missingPassword = {
      username: "coala"
    }
    const message = /password.*required/
    await testCreatingInvalidUser(missingPassword, message)
  })

  test("existing username errors out with correct message and status code", async () => {
    const usernameExists = {
      username: "coala",
      password: "bear"
    }
    const message = /username.*exists/
    await testCreatingInvalidUser(usernameExists, message)
  })

  test("username too short errors out with correct message and status code", async () => {
    const usernameTooShort = {
      username: "co",
      password: "bear"
    }
    const message = /username.*minimum.*length/
    await testCreatingInvalidUser(usernameTooShort, message)
  })

  test("password too short errors out with correct message and status code", async () => {
    const passwordTooShort = {
      username: "coala",
      password: "be"
    }
    const message = /password.*minimum.*length/
    await testCreatingInvalidUser(passwordTooShort, message)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

