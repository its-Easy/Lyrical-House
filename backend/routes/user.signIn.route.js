const router = require('express').Router()
const crypto = require('crypto')
let user = require('../models/user.model')

router.route('/').post((req, res) => {
    const uname = req.body.username
    const pass = req.body.password
    user.findOne({username: uname}, {password: 1}).
       then(users => res.json(users))
})
router.route('/verify').post((req, res) => {
    const md5sum = crypto.createHash('md5')
    const pass1 = req.body.pass1
    const pass2 = req.body.pass2
    const read = md5sum.update(pass1).digest('hex')
    
    // console.log(read + "  " +pass2)
    if(read === pass2)
    res.json("true")
    else
    res.json("false")

    console.log(read)
})

module.exports = router