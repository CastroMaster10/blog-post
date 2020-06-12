const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBlogShema = new Schema({
    title: String,
    body: String
})

const BlogPost = mongoose.model('BlogPost', newBlogShema)

module.exports = BlogPost