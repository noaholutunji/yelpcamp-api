const express = require('express')
const Campground = require('../models/campground')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/campgrounds', auth, async (req, res) => {
    const campground = new Campground({
        ...req.body,
        owner: req.user._id
    })

    try {
        await campground.save()
        res.status(201).send(campground)
    } catch (e) {
        res.status(400).send(e)
    }
})


   router.get('/campgrounds',  (req, res) => {
     Campground.find({}, function(err, campgrounds) {
        if(err){
            res.status(500).send()
        } else {
            res.status(200).send(campgrounds)
        }
     });
   })

router.get('/campgrounds/:id', (req, res) => {
    const _id = req.params.id

    Campground.findById(_id).then((campground) => {
        if (!campground) {
            return res.status(404).send()
        }
        res.send(campground)
    }).catch((e) => {
      res.status(500).send()
    })
})

router.patch('/campgrounds/:id/', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'price', 'image', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const campground = await Campground.findOne({ _id: req.params.id, owner: req.user._id})

        if (!campground) {
            return res.status(404).send()
        }

        updates.forEach((update) => campground[update] = req.body[update])
        await campground.save()
        res.send(campground)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/campgrounds/:id', auth, async (req, res) => {
    try {
        const campground = await Campground.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!campground) {
            res.status(404).send()
        }

        res.send(campground)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router