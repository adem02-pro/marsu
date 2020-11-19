const mongoose = require('mongoose')

const Friend = mongoose.model('Friend', {
    marsu: {type: mongoose.Schema.Types.ObjectId, ref: 'Marsupilami'},
    friend: {type: mongoose.Schema.Types.ObjectId, ref: 'Marsupilami'}
})



module.exports = Friend