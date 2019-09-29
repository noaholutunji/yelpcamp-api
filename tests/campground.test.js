const request = require('supertest')
const app = require('../src/app')
const Campground = require('../src/models/campground')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    campgroundOne,
    campgroundTwo,
    campgroundThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create campground for user', async () => {
    const response = await request(app)
        .post('/campgrounds')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Cloud's rest",
            price: 200,
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "This is a lovely experience",
        })
        .expect(201)
    const campground = await Campground.findById(response.body._id)
    expect(campground).not.toBeNull()
})

test('Should fetch user campground', async () => {
    const response = await request(app)
        .get('/campgrounds')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users campgrounds', async () => {
    const response = await request(app)
        .delete(`/campgrounds/${campgroundOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const campground = await Campground.findById(campgroundOne._id)
    expect(campground).not.toBeNull()
})

test('Should delete own campgrounds', async () => {
    const response = await request(app)
        .delete(`/campgrounds/${campgroundOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const campground = await Campground.findByIdAndDelete(campgroundOne._id)
    expect(campground).not.toBeNull()
})
