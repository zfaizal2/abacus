// Load required packages
var mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assignment: {type: String, required: true},
    givenScore: {type: Number, required: true},
    totalScore: {type: Number, required: true}
})

const categorySchema = new mongoose.Schema({
    category: {type: String, required: true},
    pctWeight: {type: Number, required: true},
    assignments: [assignmentSchema]
})

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    hours: {type: Number, required: true},
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
  terms: [termsSchema]
});

// Export the Mongoose model
const User = mongoose.model("User", UserSchema);
const Term = mongoose.model("Term", termsSchema);
const Class = mongoose.model("Class", classSchema);
const Category = mongoose.model("Category", categorySchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);


module.exports = {User, Term, Class, Category, Assignment}


// User info
// school
// email   
// name
// userID
// terms: [
//     FALL2020: [
//         class1: 
//             categories:[
//                 category1: [{assignment1}, {
//                                                  assignmentName:exam1,
//                                                  score: 32,
//                                                  total: 100
//                                                      }]
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