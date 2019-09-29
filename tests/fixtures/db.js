const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Campground = require('../../src/models/campground')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'Mike',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'Jess',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const campgroundOne = {
    _id: new mongoose.Types.ObjectId(),
    name: "Cloud's rest",
    price: 200,
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "This is a lovely experience",
    owner: userOne._id
}

const campgroundTwo = {
    _id: new mongoose.Types.ObjectId(),
    name: "Blue Sky",
    price: 1000,
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Beautiful site to behold",
    owner: userOne._id
}

const campgroundThree = {
    _id: new mongoose.Types.ObjectId(),
    name: "Cool Forest",
    price: 1500,
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Beautiful site to behold",
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Campground.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Campground(campgroundOne).save()
    await new Campground(campgroundTwo).save()
    await new Campground(campgroundThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    campgroundOne,
    campgroundTwo,
    campgroundThree,
    setupDatabase
}