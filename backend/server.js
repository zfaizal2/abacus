const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require("./models/user.model")


const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
//mongoose.connect(uri, {useNewUrlParser: true});

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


app.use(cors());
app.use(express.json());

app.listen(port, () => {

    const name = "Zayyan Faizal"
    const email = "zayyanf@illinois.edu"
    const school = "University of Illinois"
    
    const man = new User({
        name, 
        email,
        school
    })
    man.save();
    console.log(man)
    console.log(`Server is running on port: ${port}`);
})

