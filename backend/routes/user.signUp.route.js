const router = require('express').Router()
const crypto = require('crypto')
let user = require('../models/user.model')

router.route('/').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    var password = req.body.password
    const collegeName = req.body.collegeName

    const md5sum = crypto.createHash('md5')
    password = md5sum.update(password).digest('hex')
    const newUser = new user({firstName, lastName, username, password, collegeName})

    newUser.save()
      .then(() => res.json('User Added'))
      .catch(err => res.status(400).json('Error: '+err))
})

module.exports = router