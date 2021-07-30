const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const {User, Term, Class, Category} = require("./models/user.model");
router = express.Router();
const SUCCESS = 200;
const NOT_FOUND = 404;
const SERVER_ERR = 500;
const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


//app.use(cors());
app.use(express.json());

 require("./routes")(app, router);


app.post("/users", async function(req, res) {
    //console.log(sub)
    const email = req.body["email"]
    const authKey = req.body["user_id"]
    var userMsg = {email: `${email}`,userID:`${authKey}`};
    const userThing = await User.exists(userMsg)

    var newName = req.body["name"]
    var newEmail = req.body["email"]
    var newSchool = "University of Illinois"
    console.log(authKey)
    const newUser = new User({
        name: newName,
        email: newEmail,
        school: newSchool,
        userID: authKey,
        terms: []
    })
    newUser.save();
    res.status(SUCCESS).send({
        message: "New User Created"
    });

})


app.get("/users/:authKey", async function(req, res) {
    const userThing = await User.findOne({userID: req.params.authKey})
    res.status(SUCCESS).send({
        message: userThing._id
    })
})

app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);
})

// app.listen("/signin", function(req, res)  {

//     const name = "Zayyan Faizal"
//     const email = "zfaizal2@illinois.edu"
//     const school = "University of Illinois"
//     const userID = "google-oauth2|104472895282688655397"
//     const newUser = new User({
//         name, 
//         email,
//         school, 
//         userID
//     })
//     newUser.save();
//     //console.log(newUser)
//     res.status(200).send();
// });
