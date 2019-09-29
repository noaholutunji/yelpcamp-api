const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const campgroundRouter = require('./routers/campground')
const commentRouter = require('./routers/comment')

const app = express()
app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(campgroundRouter)
app.use(commentRouter)

module.exports = app