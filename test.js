const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true, useUnifiedTopology:true})

BlogPost.create({
    title: 'Esta es una prueba',
    body: 'porfavor ya funciona',
}, (error,blogpost) =>{
    console.log(error,blogpost);
});



