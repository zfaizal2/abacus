const {User, Term} = require("../models/user.model")

module.exports =  function(router) {
    const termsRoute = router.route("/terms");

    termsRoute.post(async (req, res) => {
        //authentication for user
        var authKey = req.body["userID"];
        var userFind = {userID:`${authKey}`};
        var userTerm = req.body["term"];
        //find user
        var userObj = await User.findOne(userFind);
        //create term
        var newTerm = new Term({termName: `${userTerm}`});
        //save term to user
        userObj.terms.push(newTerm);
        userObj.save();
        res.status(200).send(userObj);
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