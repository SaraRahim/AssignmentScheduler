// STUDENT CONTROLLER
const Student = require('../models/student');
const mongoose = require('mongoose');

// ADD STUDENT PAGE 
exports.addStudent = async (req, res) => {
    const locals = {
        title: 'Add New Student',
        description: 'NodeJs Assignment System'
    }
        res.render('assignment/addStudent', locals);
    }
    
// POST STUDENT TO DATABASE 
exports.postStudent = async (req, res) => {
    try {
        const newStudent = new Student({
            studentName: req.body.studentName,
            studentNumber: req.body.studentNumber
            });
        await newStudent.validate(); // Validate the new assignment

        await Student.create(newStudent);
        req.flash('information', 'New Student has been added!'); // popup message showing information
        res.redirect('/'); // redirect back to homepage 
    } catch (error) {
        console.log(error);
    }
};

// EDIT STUDENT DATA PAGE 
exports.editStudent = async (req, res) => {
    try {
        const student = await Student.findOne({_id: req.params.id}) // find by objectid
        const locals = {
            title: "Edit Student Data",
            description: "Nodejs Assignment System",
        };

        res.render('assignment/editStudent', {
            locals, student
        })
    } catch (error) {
        console.log(error);
    }
}

// POST STUDENT EDIT TO THE DATABASE 
exports.postStudentEdit = async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, { // find by objectid and update 
            studentName: req.body.studentName,
            studentNumber: req.body.studentNumber,
            updatedAt: Date.now()
        });

        req.flash('success', 'Student has been updated!'); // popup message showing information
        res.redirect('/'); // redirect to homepage 
    } catch (error) {
        console.log(error);
    }
};

// VIEW STUDENT PAGE 
exports.viewStudent = async (req, res) => {
    const locals = {
        title: 'View Students',
        description: 'NodeJs Assignment System'
    }

    try {
        const students = await Student.aggregate([{ $sort: {updatedAt: -1}}]) // sort by newest to oldest 
        res.render('assignment/viewStudent', {locals, students});
    } catch (error){
        console.log(error);
    }
}
