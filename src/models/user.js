const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname : {
        type: 'string',
    },
    lastname : {
        type : 'string',
    },
    email : {
        type : 'string',
    },
    password : {
        type : 'string',        
    },
    age : {
        type : 'number',
    },
    gender : {
        type : 'string',
    },
})

module.exports = mongoose.model('User', userSchema);