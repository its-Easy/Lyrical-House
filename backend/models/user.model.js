const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    collegeName: String
})

const user = mongoose.model('userDetails', userSchema)

module.exports = user 