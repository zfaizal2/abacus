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
    
    assnRoute.post(async (req, res) => {
        var authKey = req.body["userID"];
        var termID = req.body["termID"];
        var classID = req.body["classID"];
        var catId = req.body["categoryID"];
        var name = req.body["assignmentName"];
        var score = req.body["score"];
        var total = req.body["total"];


        var userFind = {userID:`${authKey}`};
        var userObj = await User.findOne(userFind);
        var catObj = userObj.terms.id(termID).classes.id(classID).categories.id(catId);

        var assns = catObj.assignments;
        
        var newAssn = new Assignment({assignment:name, givenScore:score, totalScore:total});

        assns.push(newAssn);
        userObj.save();
        console.log(catObj);
        res.status(200).send(catObj);
    });
    return router;  
}

/* sample request
{ 
    "userID":"google-oauth2|105237502290369756356",
    "courses": [
        {
            "courseName":"CS225",
            "category":"Exams",
            "assignment":"Exam 1",
            "score":32,
            "totalScore":100
        },
        {
            "courseName":"CS225",
            "category":"Exams",
            "assignment":"Exam 2",
            "score":32,
            "totalScore":100
        },
    ]
}*/