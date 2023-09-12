// STUDENT SCHEMA
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentNumber: {
        type: String,
        required: true,
        unique: true
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

// to allow no duplicates 
studentSchema.pre('save', async function(next) {
    const validateStudent = await this.constructor.findOne({ studentNumber: this.studentNumber });
    if (validateStudent) { // if it already exists then it will print error in the console
        throw new Error('Student with the same student number already exists.');
    }
    next();
});


module.exports = mongoose.model('Student', studentSchema);
