const { UserModel } = require("../db/index");


function UserMiddleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findone({
        username: username,
        password: password
    })
    .then(function(value) {
        if(value) {
            next();
        } else {
            res.status(401).json({
                message: "User not there"
            })
        }
    })

}