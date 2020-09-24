const mongoose = require('mongoose');
const keys = require('./config/key');

module.exports = mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(()=> console.log('MongoDB Connected Successfully...'))
    .catch(err => console.log(err))
    