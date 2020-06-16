const expressFunction = require('express')
const mongoose = require('mongoose')
var expressApp = expressFunction()

const url = 'mongodb+srv://peter:1234@panlum-ynyka.gcp.mongodb.net/Panlum?retryWrites=true&w=majority'
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-type, Option, Authorization')
    return next()
})

expressApp.use(expressFunction.json())

expressApp.use((req, res, next) => {
    mongoose.connect(url,config)
    .then(() => {
        console.log('Connected to MongoDB...')
        next()
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB')
        res.status(501).send('Cannot connect to MondoDB')
    })
})

expressApp.use('/user',require('./express/routes/user'))
expressApp.use('/signin', require('./express/routes/signin'))
expressApp.use('/thread', require('./express/routes/thread'))
expressApp.use('/comment', require('./express/routes/comment'))
expressApp.use('/like', require('./express/routes/like'))

expressApp.listen(3000, function(){
    console.log('Listening on port 3000')
})