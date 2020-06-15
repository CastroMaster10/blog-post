const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBlogShema = new Schema({
    title: String,
    body: String,
    image: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
    
})

const BlogPost = mongoose.model('BlogPost', newBlogShema)

module.exports = BlogPost