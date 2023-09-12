// ASSIGNMENT CONTROLLER
const assignment = require('../models/assignment');
const Assignment = require('../models/assignment');
const Student = require('../models/student');
const student = require('../models/student');
const Report = require('../models/report');
const mongoose = require('mongoose');

// HOMEPAGE 
exports.homepage = async (req, res) => {
    const messages = await req.consumeFlash('information'); // popup messages 
    const locals = {
        title: 'Assignment Creator',
        description: 'NodeJs Assignment System'
    }

    let perPage = 10; // only lets 10 assignments per page 
    let page = req.query.page || 1;

    try {
        const assignments = await Assignment.aggregate([{ $sort: {updatedAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        const count = await Assignment.count();

        res.render('index', {locals, assignments, current : page, pages: Math.ceil(count / perPage), messages});
    } catch (error){
        console.log(error);
    }
}

// ABOUT PAGE 
exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'NodeJs Assignment System'
    }

    try {
        res.render('about', {locals});
    } catch (error){
        console.log(error);
    }
}

// HELP PAGE 
exports.help = async (req, res) => {
    const locals = {
        title: 'Help',
        description: 'NodeJs Assignment System'
    }

    try {
        res.render('help', locals);
    } catch (error){
        console.log(error);
    }
}

// get the new assigment
exports.addAssignment = async (req, res) => {
    try {
        // Fetch assignments and students from the database
        const assignments = await Assignment.find();
        const students = await Student.find();

        // Render a page that includes the form
        res.render('assignment/add', { assignments, students });

    const locals = {
        title: 'Add New Assignment',
        description: 'NodeJs Assignment System'
    }

    } catch (errror){
        console.log(error);
    }
    };

exports.postNewAssignment = async (req, res) => {
    try {
      const newAssignment = new Assignment({
        ownerName: req.body.ownerName,
        moduleName: req.body.moduleName,
        weight: req.body.weight,
        description: req.body.description,
        assignmentName: req.body.assignmentName,
        dueDate: req.body.dueDate,
      });
  
      await newAssignment.save(); // Validate the new assignment
  
      await Assignment.create(newAssignment);
      req.flash('success', 'New Assignment has been added!');
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  }; 

// VIEW ASSIGNMENT DATA
exports.view = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({_id: req.params.id}) // find assignment by objectid
        const locals = {
            title: "View Assignment Data",
            description: "Nodejs Assignment System",
        };

        res.render('assignment/view', {
            locals, assignment
        })
    } catch (error) {
        console.log(error);
    }

}

// EDIT ASSIGNMENT DATA
exports.edit = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({_id: req.params.id}) // find by assignment id
        const locals = {
            title: "Edit Assignment Data",
            description: "Nodejs Assignment System",
        };

        res.render('assignment/edit', {
            locals, assignment
        })
    } catch (error) {
        console.log(error);
    }

}

// UPDATE ASSIGNMENT DATA
exports.editPost = async (req, res) => {
    try {
        await assignment.findByIdAndUpdate(req.params.id,{ // finds by objectid
            // feilds available to update 
            ownerName: req.body.ownerName,
            moduleName: req.body.moduleName,
            weight: req.body.weight,
            assignmentName: req.body.assignmentName,
            description: req.body.description,
            dueDate: req.body.dueDate,
            updatedAt: Date.now()
        });

        res.redirect('/'); // rediect to homepage 
        req.flash('information', 'Assignment has been updated!'); // information popup
      
    } catch (error) {
        console.log(error);
    }

}

// DELETE ASSIGNMENT DATA
exports.deleteAssignment = async (req, res) => {
    try {
        await Assignment.deleteOne({_id: req.params.id}); // finds by objectid
        res.redirect("/") // redirect to homepage
        req.flash('information', 'Deletion successful!'); // popup message 
    } catch (error) {
        console.log(error);
    }
}

// SEARCH ASSIGNMENTS 
exports.searchAssignments = async (req, res) => {
    const locals = {
        title: "Search Assignment Data",
        description: "Nodejs Assignment System",
    };

    try {
    let searchTerm = req.body.searchTerm; // from the header page 
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const assignments = await Assignment.find({ // finds from the assignments array 
        $or: [
            // only returns search results based on these inputs 
            {assignmentName: {$regex: new RegExp(searchNoSpecialChar, "i")}}, 
            {moduleName: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            {ownerName: {$regex: new RegExp(searchNoSpecialChar, "i")}}
        ]
    });

    res.render('search', {
        assignments, locals
    })
    } catch (error) {
        console.log(error);
    }
}

// ADD NEW ASSIGNMENT PAGE 
exports.addNewAssignment = async (req, res) => {

    const locals = {
        title: 'Add New Assignment',
        description: 'NodeJs Assignment System'
    }
        res.render('assignment/addAssignment', locals);

}


