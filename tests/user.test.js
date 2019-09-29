const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/register').send({
        username: 'noah',
        password: 'olutunji91'  
    }).expect(201)   
})

test('Should login existing user', async () => {
    const response = await request(app).post('/login').send({
        username: userOne.username,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/login').send({
        username: userOne.username,
        password: 'thisisnotmypass'
    }).expect(400)
})

