// REPORT SCHEMA 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    studentName: { // < from student schema 
        type: String,
        required: true
    },
    studentNumber: {
        type: String,
        required: true
    },
    assignmentName: { // < from assignment schema
        type: String,
        required: true
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
        // must be between 0 - 100 
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
        // defined in the website
    },
    createdAt: {
        type: Date,
        // time at this created moment
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        // time at this current moment
        default: Date.now()
    }
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;