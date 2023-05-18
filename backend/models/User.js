const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsereSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UsereSchema)
User.createIndexes()
module.exports = User