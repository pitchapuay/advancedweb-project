var expressFinction = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const router = expressFinction.Router();

const key = 'MY_KEY';

var Schema = require("mongoose").Schema;

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
} catch (err) {
    User = mongoose.model('users', userSchema)
}

const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcryptjs compare'))
            } else {
                resolve({ status: data });
            }
        });
    })

}

const findUser = username => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resolve({ id: data._id, username: data.username, password: data.password })
                } else {
                    reject(new Error('Cannot find username!'));
                }
            }
        })
    })
}

router.route('/signin').post(async (req, res) => {
    const payload = {
        username: req.body.username,
        password: req.body.password
    };


    console.log(payload)
    try {
        const result = await findUser(payload.username);
        const loginStatus = await compareHash(req.body.password, result.password)
        const status = loginStatus.status;

        if (status) {
            const token = jwt.sign(result, key, { expiresIn: 60 * 5 })
            res.status(200).json({ result, token, status });
        } else {
            res.status(200).json({ status });
        }
    } catch (err) {
        res.status(404).send(err)
    }


})

module.exports = router