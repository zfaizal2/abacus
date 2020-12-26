// Load required packages
var mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assignment: String,
    givenScore: Number,
    totalScore: Number
})

const categorySchema = new mongoose.Schema({
    category: String,
    assignments: [assignmentSchema]
})

const classSchema = new mongoose.Schema({
    className: String,
    categories: [categorySchema]
})


const termsSchema = new mongoose.Schema({
    termName: String,
    classes: [classSchema]
})

// Define our user schema
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  school: { type: String, required: true },
  terms: [termsSchema]
});

// Export the Mongoose model
const User = mongoose.model("User", UserSchema);
module.exports = User


// User info
// school
// email   
// name
// userID
// terms: [
//     FALL2020: [
//         class1: 
//             categories:
//                 category1: [assignment1, assignment2]
//         class2,
//         class3
//     ],
//     SPRING2020: [
//         class1: 
//             categories:
//                 category1: []
//         class2,
//         class3
//     ]
// ]