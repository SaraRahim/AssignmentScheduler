// ASSIGNMENT SCHEMA AND MODEL
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    // reference to the student schema 
    student: {
        type: mongoose.Schema.Types.ObjectId, // objectID - unique id of the form 
        ref: 'Student'
    },
    ownerName: {
        type: String,
        required: true
    },
    moduleName: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        // value must be between 0 - 100
        min: 0,
        max: 100
    },
    assignmentName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
        // date assigned in website
    },
    createdAt: {
        type: Date,
        // date at this current moment
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        // date at this current moment
        default: Date.now()
    }
});




module.exports = mongoose.model('Assignment', assignmentSchema);
