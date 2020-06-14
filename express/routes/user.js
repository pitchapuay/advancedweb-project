var expressFunction = require('express')
const router = expressFunction.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = require('mongoose').Schema
const userSchema = Schema({
    // id: String,
    username: String,
    password: String,
    email: String,
    name: String,
    age: Number,
    avatar: String
}, {
    collection: 'users'
})

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema)
}

const makeHash = async plainText => {
    const result = await bcrypt.hash(plainText, 10)
    return result
}

const insertUser = dataUser => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            // id: dataUser.id,
            username: dataUser.username,
            password: dataUser.password,
            email: dataUser.email,
            name: dataUser.name,
            age: dataUser.age,
            avatar: dataUser.avatar
        })
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert user to DB!'))
            } else {
                resolve({ message: 'Sign up successfully' })
            }
        })
    })
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
            .then(hashText => {
                const payload = {
                    // id: req.body.id,
                    username: req.body.username,
                    password: hashText,
                    email: req.body.email,
                    name: req.body.name,
                    age: req.body.age,
                    avatar: req.body.avatar
                }
                console.log(payload)
                insertUser(payload)
                    .then(result => {
                        console.log(result)
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {

            })
    })

module.exports = router