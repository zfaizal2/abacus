const {User, Term} = require("../models/user.model")

module.exports =  function(router) {
    // const addTermsRoute = router.route("/terms/:userID");
    const termsRoute = router.route("/terms/:userID");
    // constants
    const SUCCESS = 200;
    const NOT_FOUND = 404;
    const SERVER_ERR = 500;

    termsRoute.get(async (req, res) => {
        var userID = req.params.userID
        var userObj = await User.findById(userID)
        res.status(SUCCESS).send({message:userObj.terms})
    })  

    termsRoute.post(async (req, res) => {
        //authentication for user
        var userID = req.params.userID;
        var userTerm = req.body["term"];
        //find user
        var userObj = await User.findById(userID);
        //get list of terms
        // var terms = userObj.terms;
        var addTerm = {};
        addTerm[userTerm] = [];
        var newTerm = new Term({termName:userTerm, classes:[]});
        userObj.terms.push(newTerm);

        userObj.save().then(res.status(SUCCESS).send(userObj.terms));


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