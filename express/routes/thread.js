var expressFunction = require('express')
const router = expressFunction.Router()
const mongoose = require('mongoose')


var Schema = require('mongoose').Schema
const userSchema = Schema({
    // id: String,
    like: Number,
    title: String,
    textArea: String,
    filter: String,
    idUser: String,
    profile: {
        name: String,
        age: Number,
        avatar: String
    },
    time: { type: Date, default: Date.now }
}, {
    collection: 'threads'
})

let Thread
try {
    Thread = mongoose.model('threads')
} catch (error) {
    Thread = mongoose.model('threads', userSchema)
}


const addThread = (threadData) => {
    return new Promise((resolve, reject) => {
        var new_thread = new Thread(
            threadData
        );
        new_thread.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert thread to DB!'));
            } else {
                resolve({ message: 'Thread added successfully' });
            }
        });
    });
}
const getThread = () => {
    var mysort = { 'title': -1 };
    return new Promise((resolve, reject) => {
        Thread.find({}, (err, data) => {
            if (err) {
                reject(new Error('Cannont get Thread'));
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannont get Thread'));
                }
            }
        })
    });
}
router.route('/thread')
    .get((req, res) => {
        console.log('get');
        getThread()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });

router.route('/thread')
    .post((req, res) => {
        console.log('add');
        addThread(req.body)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    })

router.route('/thread/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const threads = await Thread.find({ _id: id })
        res.json(threads)
    })

router.route('/mythread/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const threads = await Thread.find({ idUser: id })
        res.json(threads)
    })

    router.route('/delete/:id')
    .delete(async (req, res) => {
    const { id } = req.params

    await Thread.findByIdAndDelete(id)
    res.status(204).end()
})

module.exports = router