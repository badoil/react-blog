const express = require('express');
const app = express();
app.use(express.json()) 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user')
const config = require('./config/key')
const { auth } = require('./middleware/auth');
 

mongoose.connect(config.mongoURI, 
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
            .then(() => console.log('db connedted'))
            .catch(error => console.log(error))




app.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })


})

app.post('/register', (req, res) => {
  
    const user = new User(req.body);
      
    
    user.save((err, userData) => {
        if(err) throw err
        return res.status(200).json({success: userData})
    })
})

app.post('/login', (req, res) => {
    User.findOne({email:req.body.email}, (err, user)=> {
        if(!user) return res.json({message: "user not found"})
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(err) return res.status(400).json({message: "wrong password"})

            let token = jwt.sign(user._id.toHexString() , 'secret')
            console.log("token: ", token)
            user.token = token;
            user.save((err, user)=> {
                if(err) return res.status(400).json({message: "generating token failed"})
                res.cookie("cookie", user.token).status(200).json({login: true})
                
            })           
        })


app.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, result) => {
        if(err) return res.status(400).json({message: err});
        res.status(200).json({logout: true})
    })
})

        /*user.comparePassword(req.body.password, (err, isMatched)=>{
            if(!isMatched) return res.json({login: false})            
        })
        
        */
    })
})



//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(cookieParser());


const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log(`Server is listening on ${port}`)});