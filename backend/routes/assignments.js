const {User, Assignment} = require("../models/user.model");

module.exports = function(router) {
    const assnRoute = router.route("/assignments");
    const assnUpdate = router.route("/assignments/:id");

    const SUCCESS = 200;
    const NOT_FOUND = 404;
    const SERVER_ERR = 500;
    

    /* category request
    { 
        userID: asjdf;lkasjlfjsakdfl,
        termID: idididididiididid,
        classID: idididididiididid,
        categoryID: idididididiididid,
        assignmentName: "its a me",
        score: 30,
        total: 100,
    }
    */
    

    //add course
    assnRoute.post(async (req, res) => {
        var userID = req.body["userID"];
        var termID = req.body["termID"];
        var classID = req.body["classID"];
        var catId = req.body["categoryID"];
        var name = req.body["assignmentName"];
        var score = req.body["score"];
        var total = req.body["total"];


        var userObj = await User.findById(userID);
        var catObj = userObj.terms.id(termID).classes.id(classID).categories.id(catId);

        var assns = catObj.assignments;
        
        var newAssn = new Assignment({assignment:name, givenScore:score, totalScore:total});

        assns.push(newAssn);
        userObj.save();
        console.log(catObj);
        res.status(200).send(catObj);
    });

    //update course
    assnUpdate.put(async (req, res) => {
       var assnID = req.params.id;
       var userID = req.body["userID"];
       var score = req.body["score"];
       var termID = req.body["termID"];
       var classID = req.body["classID"];
       var catId = req.body["categoryID"];
       var score = req.body["score"];
       var total = req.body["total"];

       var userObj = await User.findById(userID);
       var assnObj = userObj.terms.id(termID).classes.id(classID).categories.id(catId).assignments.id(assnID);
       console.log(assnObj)
       assnObj.givenScore = score;
       assnObj.totalScore = total;
       userObj.save();
       res.status(200).send(assnObj);
    })
    return router;  
}

