
const Blog = require("../model/blogModel");
const Comment = require("../model/commentModel")
const fs = require('fs');
async function handleAddBlog(req, res) {
  const { title, summary, content } = req.body;
  // Confirm data
  if (!summary || !title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }
  let coverImageURL = "/uploads/default.png";
  if(req.file){
    coverImageURL = `/uploads/${req.user._id}_${req.user.username}/${req.file?.filename}`;
  }

  const blog = await Blog.create({
    title,
    summary,
    content,
    createdBy: req.user._id,
    coverImageURL,
  });

  if (blog) {
    // Created
    return res.status(201).json(blog);
  } else {
    return res.status(400).json({ message: "Invalid blog data received" });
  }
}

async function hadleViewBlogs(req, res) {
  if (req.user==null) {
    return res.json(await Blog.find()
      .populate({
        path: "createdBy",
        select: "-password", // Exclude the password field
      })
      .sort({ createdAt: -1 })
      .limit(20));
  } 
  else {
    return res.json(await Blog.find({createdBy : req.user._id})
    .populate({
        path: "createdBy",
        select: "-password", // Exclude the password field
      })
      .sort({ createdAt: -1 })
      .limit(20)
    );
  }
}

async function handleViewBlog(req, res){
    try {
      const blog = await Blog.findById(req.params.id).populate("createdBy");
      if(!blog) return res.status(404).json({ message: 'Blog not found' });
      const comments = await Comment.find({blogId : blog._id}).populate("createdBy");
      res.json({blog, comments});
    } catch (error) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    
}


async function handleAddComment(req, res){
    const {content} = req.body;

    return res.json(await Comment.create({
        content,
        blogId : req.params.blogid,
        createdBy : req.user._id
    })); 
 }



 async function handleDeleteBlog(req, res){

    const entry = await Blog.findById(req.params.id);

    // deleting blog from DB
    await Blog.deleteOne({_id : entry._id});

    // deleting coverImage from server
    if(entry.coverImageURL !== "/uploads/default.png"){
        const deletePath = `public${entry.coverImageURL}`;
        fs.unlink(deletePath, () => {});
    }

    // deleting comments for individual blogs
    await Comment.deleteMany({blogId : entry._id})

    res.status(200).json({message : "deleted"});
}
module.exports = { handleAddBlog, hadleViewBlogs, handleViewBlog, handleAddComment, handleDeleteBlog };
