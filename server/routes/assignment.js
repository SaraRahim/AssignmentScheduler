// ROUTE PAGE FOR ALL ROUTES, 
// FROM ASSIGNMENT CONTROLLER
// STUDENT CONTROLLER
// REPORT CONTROLLER

const express = require('express');
const router = express.Router();

// connect to controllers
const assignmentController = require('../controllers/assignmentController'); // assignment controller 
const studentController = require('../controllers/studentController'); // student controller
const reportController = require('../controllers/reportController'); // student controller

// different pages/ links 
router.get('/', assignmentController.homepage); // route to homepage
router.get('/about', assignmentController.about); // route to about page
router.get('/help', assignmentController.help); // route to help page
router.get('/view/:id', assignmentController.view); // route to view assignment
router.get('/viewReport/:id', reportController.view); // route to view Report
router.get('/viewStudent', studentController.viewStudent); // route to view student
router.get('/report', reportController.report); // route to report page 

// render add report page
router.get('/add', assignmentController.addAssignment); // route to add report page
router.post('/add', reportController.postAssignment); // sending the report data to mongodb

// render add student page 
router.get('/addStudent', studentController.addStudent); // route to add student assignment page
router.post('/addStudent', studentController.postStudent); // sending the student data to mongodb
 
// render add assignment page 
router.get('/addAssignment', assignmentController.addNewAssignment); // route to add assignment page
router.post('/addAssignment', assignmentController.postNewAssignment); // sending the assignment data to mongodb

// render edit pages 
router.get('/edit/:id', assignmentController.edit); // route to edit page - by element id
router.put('/edit/:id', assignmentController.editPost); // edit the edits made - by element id
router.delete('/edit/:id', assignmentController.deleteAssignment); // delete by element id

// render edit student pages
router.get('/editStudent/:id', studentController.editStudent); // route to edit page - by element id
router.put('/editStudent/:id', studentController.postStudentEdit); // edit the edits made - by element id

// render edit report pages
router.get('/editReport/:id', reportController.editReport); // route to edit page - by element id
router.put('/editReport/:id', reportController.postReportEdit); // edit the edits made - by element id

// render search, search reports pages
router.post('/search', assignmentController.searchAssignments); // sending the search
router.post('/searchReports', reportController.searchReports); // sending the search
router.delete('/searchReports/:id', reportController.deleteAssignment); // delete by element id


module.exports = router;

