const express = require('express')
const Campground = require('../models/campground')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/campgrounds/:1d/comments', (req, res) => {
    Comment.find({}, function(err, comments){
        if(err){
            res.status(500).send()
        } else {
            res.status(200).send(comments)
        }
    });
})

router.post('/campgrounds/:id/comments', auth, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            return res.status(404).send()
        } else {
            Comment.create({comment: req.body.comment}, function(err, comment){
                if(err){
                    res.status(400).send(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    res.status(201).send(campground)
                }
            });
        }
    });
});



module.exports = router











// router.post('/comments', auth, async (req, res) => {
//     const comment = new Comment({
//         ...req.body,
//         owner: req.user._id
//     })

//     try {
//         await comment.save()
//         res.status(201).send(comment)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


// router.get('/comments', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     if (req.query.sortBy) {
//         const parts = req.query.sortBy.split(':')
//         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
//     }

//     try {
//         await req.user.populate({
//             path: 'comments',
//             match,
//             options: {
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip),
//                 sort
//             }
//         }).execPopulate()
//         res.send(req.user.comments)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/comments/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const comment = await Comment.findOne({ _id, owner: req.user._id })

//         if (!comment) {
//             return res.status(404).send()
//         }

//         res.send(comment)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/comments/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['text']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const comment = await Comment.findOne({ _id: req.params.id, owner: req.user._id})

//         if (!comment) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => comment[update] = req.body[update])
//         await comment.save()
//         res.send(comment)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/comments/:id', auth, async (req, res) => {
//     try {
//         const comment = await Comment.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!comment) {
//             res.status(404).send()
//         }

//         res.send(comment)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// module.exports = router