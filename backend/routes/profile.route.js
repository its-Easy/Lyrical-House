const router = require('express').Router()
let poemPosts = require('../models/post.model')
let users = require('../models/user.model')

let username

router.route('/')
.post((req, res) => {
  console.log('inside /profile')
  username = req.body.user
  res.send('/'+username)
})
.get((req, res) => {
  console.log("inside/profile/username")
  console.log(username)
  poemPosts.find({username: username})
  .then(post => {res.json(post)
    console.log(post)})
    .catch(err => res.status(400).json(err))
  })

router.route('/find-user').get((req, res) => {
  users.find({username: username})
    .then(user => res.json(user))
})
  
module.exports = router