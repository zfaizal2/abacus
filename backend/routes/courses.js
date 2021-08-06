const {User, Term, Class} = require("../models/user.model");
module.exports =  function(router) {
    const coursesRoute = router.route("/courses");
    const courseRoute = router.route("/courses/:id");
    const course = router.route('/courses/many');

    // sample /courses POST 
    // {
    //     "userID":"google-oauth2|105237502290369756356",
    //     "termID":"XXXXXXXXX",
    //     "course":"CS221",
    //     "hours":3,
    // }

    coursesRoute.post(async (req, res) => {
        console.log(req.body)
        //userId and search param
        var userID = req.body["userID"];
        var termID = req.body["termID"]
        var classHours = req.body["hours"];
        var userClass = req.body["course"];
        var newClass = new Class({className: userClass, hours: classHours});
        var userObj = await User.findById(userID);
        userObj.terms.id(termID).classes.push(newClass)
        userObj.save()
        var termData = userObj.terms.id(termID)
        console.log(termData)
        res.status(200).send(termData)
    
    })
  return router;  
};

/* sample user req
{
    "created_at": "2020-12-24T02:31:07.374Z",
    "email": "XXXXXXX@gmail.com",
    "email_verified": true,
    "family_name": "XXXXXXX",
    "given_name": "XXXXXXX",
    "identities": [
        {
            "provider": "google-oauth2",
            "user_id": "123456789098765432123",
            "connection": "google-oauth2",
            "isSocial": true
        }
    ],
    "locale": "en",
    "name": "XXXXXX XXXXXXX",
    "nickname": "xxxxxxxxxxx",
    "picture": "https://content.com",
    "updated_at": "2020-12-25T05:14:05.205Z",
    "user_id": "google-oauth2|123456789098765432123",
    "last_ip": "00.000.000.168",
    "last_login": "2020-12-25T05:14:05.204Z",
    "logins_count": 7,
    "blocked_for": [],
    "guardian_authenticators": []
}
*/