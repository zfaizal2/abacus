const {User, Term, Class} = require("../models/user.model");
module.exports =  function(router) {
    const coursesRoute = router.route("/courses");
    const courseRoute = router.route("/courses/:id");
    const course = router.route('/courses/many');

    // sample /courses POST 
    // {
    //     "userID":"google-oauth2|105237502290369756356",
    //     "term":"SPRING2021",
    //     "course":"CS221"
    // }

    coursesRoute.post(async (req, res) => {
        //userId and search param
        var authKey = req.body["userID"];
        //var userObj = await User.findOne(userFind);

        //termName and search
        var userTerm = req.body["term"];
        var classHours = req.body["hours"];
        var userFind = {userID:`${authKey}`};
        
        var userClass = req.body["course"];
        var userObj = await User.findOne(userFind);
        var userTerms = userObj.terms;
        var newClass = new Class({className: userClass, hours: classHours});
        for (var i = 0; i <= userTerms.length; i++) {
            if (userTerms[i].termName = userTerm) {
                userObj.terms[i].classes.push(newClass);
                userObj.save(
                    function(err){
                        if (err){
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(userObj.terms);
                        }
                    }
                )
                
                break;
            }
        }

        
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