// Write your tests here
const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')
const Auth = require('./auth/auth-model.js')
const jokes = require('./jokes/jokes-data')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("users").truncate();
})

afterAll(async () => {
  await db.destroy()
})


test('sanity', () => {
  expect(true).toBe(true)
})


describe('[GET] /jokes', () => {
  let res
  beforeEach(async () => {

  await request(server)

      .post("/api/auth/register")

      .send({ username: "randy", password: "scrandy" });

    res = await request(server)

      .post("/api/auth/login")

      .send({ username: "randy", password: "scrandy" });
  })

  it('responds with a 201', async () => {
    expect(res.status).toBe(201)
  })

  it('returns to you all the jokes in database', async () => {

    expect(jokes).toHaveLength(3)
  })
})

describe('[POST] /api/auth/register', () => {

  let res
  beforeEach(async () => {
    res = await request(server)

      .post("/api/auth/register")

      .send({ username: "randy", password: "scrandy" });
  })

  it('responds with a 201 to clear creation', async () => {

    expect(res.status).toBe(201)

  })

  it('properly checks if your username is taken', async () => {

    res = await request(server)

      .post("/api/auth/register")

      .send({ username: "randy", password: "scrandy" });


    expect(res.status).toBe(422)

  })

})

describe('[POST], /api/auth/login', () => {

  let res
  beforeEach(async () => {

  await request(server)

      .post("/api/auth/register")

      .send({ username: "randy", password: "scrandy" });

    res = await request(server)

      .post("/api/auth/login")

      .send({ username: "randy", password: "scrandy" });
  })

  it('responds with a 201 to clear login', async () => {
    
    expect(res.status).toBe(201)

  })

  it('sucessfully adds a token upon logging in', async () => {


     res = await request(server)

      .post("/api/auth/login")

      .send({ username: "randy", password: "scrandy" });

      console.log(res)

      const token = res.body.token;

      expect(token).toBeDefined();
  })

})