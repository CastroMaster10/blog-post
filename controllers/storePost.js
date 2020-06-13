const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports =  (req,res) =>{
    if(req.files === null || req.body.title ===  null || req.body.body === null){
        return res.redirect ('/posts/new')

    }

    let image = req.files.image;  
    image.mv(path.resolve(__dirname, '..','public/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    }) 
}




