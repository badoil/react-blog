const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user')
const config = require('./config/key')


mongoose.connect(config.mongoURI, 
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
            .then(() => console.log('db connedted'))
            .catch(error => console.log(error))

app.get('/', (req, res) => {
        res.send('hello world')
})

app.post('/api/server/register', (req, res) => {
    const user = new User(req.body);
    
    
    user.save((err, userData) => {
        if(err) throw err
        res.status(200).json({success: true})
    })
})



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.listen(5002);