const express = require('express');
const router = express.Router()
const{getFeedPosts,getUserPosts,likePost}=require('../controller/Post')
const verifyToken =require('../middleware/middleware')

router.get('/',verifyToken,getFeedPosts);
router.get('/:userId/posts',verifyToken,getUserPosts);
router.get('/:id/like',verifyToken,likePost)

module.exports=router