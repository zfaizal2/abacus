const {User, Term} = require("../models/user.model")

module.exports =  function(router) {
    const termsRoute = router.route("/terms");
    // constants
    const SUCCESS = 200;
    const NOT_FOUND = 404;
    const SERVER_ERR = 500;

    termsRoute.post(async (req, res) => {
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
            if (i == terms.length) {
                //create term
                var addTerm = {};
                addTerm[userTerm] = [];
                userObj.terms.push(addTerm);
                userObj.save().then(res.status(SUCCESS).send(userObj.terms));
    
                break;
            }
            if (terms[i][userTerm]) {
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
// app.delete("/courses", async function(req, res) {
// }

// app.get("/courses", async function(req, res) {
// }