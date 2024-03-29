const express = require('express');
const router = express.Router();

const uploadConfig = require('../middlewares/uploadCover')
const {handleAddBlog, hadleViewBlogs, handleViewBlog, handleAddComment, handleDeleteBlog} = require('../controllers/blogController')

router.get('/', hadleViewBlogs);
router.get('/:id', handleViewBlog);

router.post('/addblog', uploadConfig, handleAddBlog);
router.post('/:blogid/addcomment', handleAddComment);
router.get('/delete/:id', handleDeleteBlog);


module.exports = router;