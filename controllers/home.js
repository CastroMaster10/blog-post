const BlogPost = require('../models/BlogPost');

module.exports = async (req,res) =>{
    console.log('el modelo de blogpost ha sido guardado en el homepage');
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
}