const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    summary : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    coverImageURL : {
        type : String,
        default : "/uploads/default.png"
    },
    createdBy : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user" 
    }
}, {timestamps : true})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;