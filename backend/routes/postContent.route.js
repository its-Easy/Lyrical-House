const router = require('express').Router()
let poemPosts = require('../models/post.model')

router.route('/').post((req, res) => {

  poemPosts.updateOne({username: req.body.username}, {$push: {"post.content": req.body.content, "post.title": req.body.title, "post.likes": 0}})
    .then(res => console.log(res))
})

module.exports = router