const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
     token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})



userSchema.pre('save', function(next){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) next(err);
                user.password = hash;
                next()
                
            })
        })
    }else{
        next();
    }
    
})

/* userSchema.methods.comparePassword = (plainPassword, cb)=>{
    User.find(function(err, user){
        if(err) return cb(err);
        bcrypt.compare(plainPassword, user.password, function(err, isMatched) {
            console.log(user.password)
            if(err) return cb(err)
            cb(null, isMatched)
        });
    })
    
}

userSchema.methods.generateToken = (cb)=>{
    let user = this;
    console.log("user:", user)
    let token = jwt.sign(ObjectId.toHexString(user._id) , 'secret')
    user.token = token;
    user.save((err, user)=> {
        if(err) return cb(err);
        cb(null, user);
    })
}*/


const User = mongoose.model('User', userSchema)

module.exports = { User }