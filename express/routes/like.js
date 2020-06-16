var expressFunction = require('express')
const router = expressFunction.Router()
const mongoose = require('mongoose')


var Schema = require('mongoose').Schema
const userSchema = Schema({
    // id: String,
   
    idThread: String,
    idUser: String,
    
    time : { type : Date, default: Date.now }
}, {
    collection: 'likes'
})

let Like
try {
    Like = mongoose.model('likes')
} catch (error) {
    Like = mongoose.model('likes', userSchema)
}


const addLike = (likeData) => {
    return new Promise((resolve, reject) => {
        var new_like = new Like(
            likeData
        );
        new_like.save((err, data) => {
            if (err) {
                reject(new Error('Like insert Like to DB!'));
            } else {
                resolve({ message: 'Like added successfully' });
            }
        });
    });
}
const getLike = () => {
    
    return new Promise((resolve, reject) => {
        Like.find({}, (err, data) => {
            if (err) {
                reject(new Error('Cannont get Like'));
            } else { 
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannont get Like'));
                }
            }
        })
    });
}
router.route('/like')
.get((req, res) => {
    console.log('get');
    getLike()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

router.route('/like')
    .post((req, res) => {
        console.log('add');
        addLike(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
    })

    router.route('/like/:id/:user')
    .get( async (req, res) => {
        const { id } = req.params
        const { user } = req.params
        console.log(id+user)
        const likes = await Like.find({idThread: id,idUser: user})
        res.json(likes)
      })

    router.route('/delete/:id')
      .delete(async (req, res) => {
      const { id } = req.params
  
      await Like.findByIdAndDelete(id)
      
      res.status(204).end()
  })

    

module.exports = router