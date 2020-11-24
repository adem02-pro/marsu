const mongoose = require('mongoose')

const Marsupilami = mongoose.model('Marsupilami', {
    name: {type: String, required: true},
    username: {type: String, required: true},
    birth: Date,
    family: String,
    race: String,
    food: String,
    password: {type: String, required: true},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}]
})

module.exports = Marsupilami