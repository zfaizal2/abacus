const {User, Term, Class} = require("../models/user.model")

module.exports =  function(router) {
    const coursesRoute = router.route("/courses");
    const courseRoute = router.route("/courses/:id");
    const course = router.route('/courses/many');

    coursesRoute.post(async (req, res) => {
        //userId and search param
        var authKey = req.body["userID"];
        var userFind = {userID:`${authKey}`};

        //termName and search
        var userTerm = req.body["term"];
        var termFind = {term:`${userTerm}`};
        var userClass = req.body["course"];
        var userObj = await User.findOne(userFind);
        
        //console.log(termsObj)
        var newClass = new Class({className: userClass});
        var termsObj = await User.updateOne(userFind, {classes:{$addToSet:{newClass}}})
        // var newTerm = new Term({termName: userTerm});
        // newTerm.classes.push(newClass);
        //userObj.terms.push(newTerm);
        // userObj.save();
        // console.log(userObj);
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