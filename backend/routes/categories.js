const {User, Term, Class, Category} = require("../models/user.model");

module.exports = function(router) {
    const catRoute = router.route("/categories");
    const catUpdate = router.route("/categories/:id");

    const SUCCESS = 200;
    const NOT_FOUND = 404;
    const SERVER_ERR = 500;
    
    /* category request
    { 
        userID: asjdf;lkasjlfjsakdfl,
        termID: idididididiididid,
        classID: ididididididi,
        category: exams,
        weight: 30,
    }
    */
 
    catRoute.post(async (req, res) => {
        var authKey = req.body["userID"];
        var termID = req.body["termID"];
        var classID = req.body["classID"];
        var cat = req.body["category"];
        var weight = req.body["weight"];

        var userObj = await User.findById(authKey);
        var classObj = userObj.terms.id(termID).classes.id(classID)
        var cats = classObj.categories;
        
        var newCat = new Category({category:cat, pctWeight:weight});

        cats.push(newCat);
        userObj.save();
        res.status(SUCCESS).send(classObj);
    });

    catUpdate.put(async (req, res) => {
        console.log(req.body)
        var catID = req.params.id;
        var authKey = req.body["userID"];
        var termID = req.body["termID"];
        var classID = req.body["classID"]; 
        var cat = req.body["category"];
        var weight = req.body["weight"];

        var userObj = await User.findById(authKey);
        var classObj = userObj.terms.id(termID).classes.id(classID);
        var catObj = classObj.categories.id(catID);
        catObj.category = cat;
        catObj.pctWeight = weight;

        userObj.save();
        res.status(SUCCESS).send(userObj.terms.id(termID).classes.id(classID));
    });



    return router;  
}
