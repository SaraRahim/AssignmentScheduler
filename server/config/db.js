/// CONNECTS TO MONGODB DATABASE 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // disbable strict mode in mongodb 

// DATABASE CONNECTION
const connectDB = async()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected :) at ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

// EXPORTS so it can be used in other parts of the project easily 
module.exports = connectDB;