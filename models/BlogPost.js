const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User')

const newBlogShema = new Schema({
    title: String,
    body: String,
    image: String,
    // username: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true 
    },
    datePosted: {
        type: Date,
        default: new Date()
    }
    
})

const BlogPost = mongoose.model('BlogPost', newBlogShema)

module.exports = BlogPost