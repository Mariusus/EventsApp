const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    surname: {
        type: String,
        required: 'This field is required.'
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: 'This field is required.'
    },
    country: {
        type: String,
        enum: ['Denmark', 'Sweden', 'Netherlands', 'Norway', 'Jerusalem', 'Iceland', 'Germany','China', 'Poland'],
        required: 'This field is required.'
    },
    city: {
        type: String,
    },
    occupation: {
        type: String,
        required: 'This field is required.'
    },
    useraddress: {
        type: String,
        required: 'This field is required.'
    },
    image: {
        type: String,
        required: 'This field is required.'
    },
});

userSchema.index({ name: 'text', surname: 'text',  age: 'text', password: 'text', country: 'text', city: 'text', occupation: 'text', useraddress: 'text', image: 'text' });

module.exports = mongoose.model('User', userSchema);