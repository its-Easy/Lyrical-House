const router = require('express').Router()
let poemPosts = require('../models/post.model')
let shayariPosts = require('../models/shayariPost.model')
let shortStoriesPosts = require('../models/shortStories.model')

router.route('/').get((req, res) => {
  console.log("inside the get router")
    poemPosts.find()
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err))
})
router.route('/shayari').get((req, res) => {
  console.log("inside the shayari router")
    shayariPosts.find()
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err))
})
router.route('/short-stories').get((req, res) => {
  console.log("inside the short story router")
    shortStoriesPosts.find()
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err))
})

router.route('/updateLikes').post((req, res) => {
  const query = {
    _id: req.body.id
  }
  
  const newVal = { $inc: {[`post.likes.${req.body.index}`]: 1} }

  poemPosts.updateOne(query, newVal)
    .then(res => res.send(query))
})

module.exports = router