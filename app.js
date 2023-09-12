// IMPORTING AND DEFINING IMPORTANT INFORMATION
require('dotenv').config();

// imports express modules
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override'); // for PUT, GET, POST, DELETE
const { flash } = require('express-flash-message'); // displays flash messages for validation
const session = require('express-session'); // manage session data and user session

// connects to the db 
const connectDB = require('./server/config/db');
const app = express(); // initialise express application

// PORT NUMBER 
const port = 3000 || process.env.PORT; 

// connect to db
connectDB();

// helps pass data to the forms -- MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// static files -- images, js and css
app.use(express.static('public'));

// Express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// templating engines
app.use(expressLayout);
app.set('layout', './layouts/main'); // one layout for many pages - reuseble
app.set('view engine', 'ejs');

// routes
app.use('/', require('./server/routes/assignment'))

// handle 404 
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// displays port in console
app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
});