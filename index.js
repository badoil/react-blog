const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://leo:500151@react-blog-lfvsx.mongodb.net/test?retryWrites=true&w=majority', 
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
            .then(() => console.log('db connedted'))
            .catch(error => console.log(error))

app.get('/', (req, res) => {
        res.send('hello world')
})


app.listen(5002);