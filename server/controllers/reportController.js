// REPORT CONTROLLER 
const Assignment = require('../models/assignment');
const Student = require('../models/student');
const Report = require('../models/report');
const mongoose = require('mongoose');

// POST ASSIGNMENT SCHEDULE TO DATABASE 
exports.postAssignment = async (req, res) => {
    try {
        const selectedAssignmentId = req.body.selectedAssignment; // gets selected assignment 
        const selectedStudentId = req.body.selectedStudent; // gets selected student

        const assignment = await Assignment.findById(selectedAssignmentId); // gets objectid of selected object from dropdown menu
        const student = await Student.findById(selectedStudentId); // gets objectid of selected object from dropdown menu

        if (!assignment || !student) { // if theres no assignment or student
            req.flash('error', 'Selected assignment or student does not exist.'); // error popup 
            res.redirect('/'); // redirect to homepage
            return;
        }

        // creates new report with fields from student and assignment schema
        const newReport = new Report({
            studentName: student.studentName,
            studentNumber: student.studentNumber,
            assignmentName: assignment.assignmentName,
            ownerName: assignment.ownerName,
            moduleName: assignment.moduleName,
            weight: assignment.weight,
            description: assignment.description,
            assignmentName: assignment.assignmentName,
            dueDate: assignment.dueDate,
        });

        await newReport.save();

        req.flash('information', 'New report has been added!'); // popup of information
        res.redirect('/'); // redirect to homepage

    } catch (error) {
        console.error(error);
    }
};

// REPORT PAGE 
exports.report = async (req, res) => {
    const locals = {
        title: 'Report',
        description: 'NodeJs Assignment System'
    }

    try {
        res.render('assignment/report', locals);
    } catch (error){
        console.log(error);
    }
}

// VIEW REPORT DATA
exports.view = async (req, res) => {
    try {
        const report = await Report.findOne({_id: req.params.id}) // find report by objectid
        const locals = {
            title: "View Report Data",
            description: "Nodejs Assignment System",
        };

        res.render('assignment/viewReport', {
            locals, report
        })
    } catch (error) {
        console.log(error);
    }

}

// SEARCH REPORTS PAGE 
exports.searchReports = async (req, res) => {
    const locals = {
        title: "Search Report Data",
        description: "Nodejs Assignment System",
    };

    try {
    let searchTerm = req.body.searchTerm; // gets the searchTerm: the one referenced in the header and report
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); // doesnt allow anything but letters and numbers 

    const reports = await Report.find({
        $or: [
            {studentName: {$regex: new RegExp(searchNoSpecialChar, "i")}} // only searches from the studentName
        ]
    });

    res.render('searchReports', {
        reports, locals
    })
    } catch (error) {
        console.log(error);
    }
}

// EDIT REPORT DATA
exports.editReport = async (req, res) => {
    try {
        const report = await Report.findOne({_id: req.params.id}) // finds report based on objectid

        const locals = {
            title: "Edit Report Data",
            description: "Nodejs Assignment System",
        };

        res.render('assignment/editReport', {
            locals, report
        })
    } catch (error) {
        console.log(error);
    }

}

// UPDATE REPORT DATA 
exports.postReportEdit = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id); // finds by objectid

        if (!report) { // if theres no report
            return res.status(404).send('Report not found'); // load error 404.
        }

        // shows values from report schema available to be updated
        report.studentName = req.body.studentName;
        report.studentNumber = req.body.studentNumber;
        report.ownerName = req.body.ownerName;
        report.moduleName = req.body.moduleName;
        report.weight = req.body.weight;
        report.assignmentName = req.body.assignmentName;
        report.description = req.body.description;
        report.dueDate = req.body.dueDate;
        report.updatedAt = Date.now();

        await report.save();

        req.flash('information', 'Report has been updated!'); // information popup 
        res.redirect('/'); // redirect to homepage
    } catch (error) {
        console.log(error);
    }
}


// DELETE REPORT DATA
exports.deleteAssignment = async (req, res) => {
    try {
        await Report.deleteOne({ _id: req.params.id }); // get objectid and delete 

        req.flash('information', 'Deletion successful!'); // popup message 
        res.redirect("/"); //redirect to homepage
    } catch (error) {
        console.log(error);
    }
};