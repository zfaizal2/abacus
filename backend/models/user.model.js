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
    className: { type: String, required: false },
    categories: [categorySchema]
})


const termsSchema = new mongoose.Schema({
    termName: { type: String, required: true, unique:true },
    classes: [classSchema]
})

// Define our user schema
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  school: { type: String, required: true },
  userID: { type: String, required: true},
  terms: []
});

// Export the Mongoose model
const User = mongoose.model("User", UserSchema);
const Term = mongoose.model("Term", termsSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = {User, Term, Class}


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