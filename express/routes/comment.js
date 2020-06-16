var expressFunction = require('express')
const router = expressFunction.Router()
const mongoose = require('mongoose')


var Schema = require('mongoose').Schema
const userSchema = Schema({
    // id: String,
    text: String,
    idThread: String,
    idUser: String,
    profile: {name: String,
        age: Number,
        avatar: String},
    time : { type : Date, default: Date.now }
}, {
    collection: 'comments'
})

let Comment
try {
    Comment = mongoose.model('comments')
} catch (error) {
    Comment = mongoose.model('comments', userSchema)
}


const addComment = (commentData) => {
    return new Promise((resolve, reject) => {
        var new_comment = new Comment(
            commentData
        );
        new_comment.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert Comment to DB!'));
            } else {
                resolve({ message: 'Comment added successfully' });
            }
        });
    });
}
const getComment = () => {
    
    return new Promise((resolve, reject) => {
        Comment.find({}, (err, data) => {
            if (err) {
                reject(new Error('Cannont get Comment'));
            } else { 
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannont get Comment'));
                }
            }
        })
    });
}
router.route('/comment')
.get((req, res) => {
    console.log('get');
    getComment()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

router.route('/comment')
    .post((req, res) => {
        console.log('add');
        addComment(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
    })

    router.route('/comment/:id')
    .get( async (req, res) => {
        const { id } = req.params
        const comemnts = await Comment.find({idThread: id})
        res.json(comemnts)
      })

module.exports = router