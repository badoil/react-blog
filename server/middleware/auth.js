const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.headers.cookie.replace('cookie=','');

    jwt.verify(token, 'secret', function(err, decoded){
        User.findOne({"_id": decoded, "token": token}, function(err, user){

            if(err) return res.json({message: "No authentication", err});
            req.token = token;
            req.user = user;
            next();
        })

    })
}

module.exports = { auth };