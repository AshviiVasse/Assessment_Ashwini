const mongoose = require('mongoose');

const EmpListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const List = mongoose.model('EmpList', EmpListSchema);

module.exports = { List }