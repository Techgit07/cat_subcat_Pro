const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    course: {
        type: Array,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student