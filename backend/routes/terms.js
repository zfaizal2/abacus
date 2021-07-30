const {User, Term} = require("../models/user.model")

module.exports =  function(router) {
    const addTermsRoute = router.route("/terms");
    const getTermsRoute = router.route("/terms/:userID");
    // constants
    const SUCCESS = 200;
    const NOT_FOUND = 404;
    const SERVER_ERR = 500;

    getTermsRoute.get(async (req, res) => {
        var userID = req.params.userID
        var userObj = await User.findById(userID)
        res.status(SUCCESS).send({message:userObj.terms})
    })  

    addTermsRoute.post(async (req, res) => {
        //authentication for user
        var authKey = req.body["userID"];
        var userFind = {userID:`${authKey}`};
        var userTerm = req.body["term"];
        //find user
        var userObj = await User.findOne(userFind);
        //get list of terms
        var terms = userObj.terms;
        // console.log(userTerm)
        // check if term exists
        for (var i = 0; i <= terms.length; i++) {
            //if term doesn't exist, add it
            console.log(terms[i])
            if (i == terms.length) {
                //create term
                var addTerm = {};
                addTerm[userTerm] = [];
                var newTerm = new Term({termName:userTerm, classes:[]});
                userObj.terms.push(newTerm);
                // console.log(userObj.update(
                //     {'terms.$.termName':{'$ne':userTerm}},
                //     {'$set':newTerm}
                // ))
                userObj.save().then(res.status(SUCCESS).send(userObj.terms));
    
                break;
            }
            if (terms[i].termName == userTerm) {
                res.status(SUCCESS).send({message:"Term already exists."});
                break;
            }
        }

        //var newTerm = new Term({termName: `${userTerm}`});
        //save term to user

    })
  return router; 
};

/* sample post req
{
    userID: "XXXXX",
    term: "FALL 2020",
    course: "CS 225"
}
*/