const mongoose = require('mongoose');

const EmpDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    skillset: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    } 
})

const Task = mongoose.model('EmployeeDetails', EmployeeDetailsSchema);

module.exports = { Task }